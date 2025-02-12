
import { ReactNode, createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHandleApiResponse } from '../API/apiUtils';
import { apiClient } from '../API/apiClient';
import {paths} from '../API/apiSchema'
import {PathsWithMethod} from 'openapi-typescript-helpers'



interface FormDataProviderProps<T> {
  selectedItem: T;
  isEdit: boolean;
  handleSubmit: (data: T) => void;
  handleCancel: () => void;
  data?: Record<string, any>
}

const FormPersistenceContext = createContext<FormDataProviderProps<any> | undefined>(undefined);

interface ProviderProps{
  children: ReactNode;
  endpoints: {
    create: PathsWithMethod<paths, 'post'> | null;
    update: PathsWithMethod<paths, 'put'> | null;
  };
  messages: {
    createSuccess: string;
    createError: string;
    updateSuccess: string;
    updateError: string;

  };
  queryKey: string;
  data?: Record<string, any>
}

/**
 * Provides a context for managing form data persistence and submission.
 *
 * @template T - The type of the form data. It optionally includes an 'id' property.
 * @param props.children - The child elements that will have access to the form data context.
 * @param props.endpoints.create - The API endpoint used for creating a new data record (HTTP POST).
 * @param props.endpoints.update - The API endpoint used for updating an existing data record (HTTP PUT).
 * @param props.messages.createSuccess - Message displayed upon successful data creation.
 * @param props.messages.createError - Message displayed when data creation fails.
 * @param props.messages.updateSuccess - Message displayed upon successful data update.
 * @param props.messages.updateError - Message displayed when data update fails.
 * @param props.queryKey - The React Query key used to invalidate queries after data mutation.
 * @param props.data - Optional additional data to be used within the form.
 *
 * @returns A JSX Element that serves as a provider for form data, enabling data persistence,
 * form submission (with API interaction), and cancellation handling. The provider determines
 * the form mode (create or edit) based on the presence of a selected item in the location state.
 *
 * @remarks
 * Since this component gets a value from the location state, it should be used as a route component.
 * To consume the form data context, use the useFormData hook within the child components.
 * This component utilizes React Context to share form data management logic within its children.
 * It leverages React Query's useMutation hook for handling API calls and invalidating queries
 * upon a successful data mutation. The component also handles navigation to the parent route
 * upon success or when cancellation is triggered.
 */
export function FormDataProvider<T extends {id?:string}>({
  children,
  endpoints,
  messages,
  queryKey,
  data
}: ProviderProps) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const handleApiResponse = useHandleApiResponse();

  const { selectedItem = {} as T } = location.state || {};
  const isEdit = Object.keys(selectedItem).length > 0;
  const create = async (data: T) => {
    if (endpoints.create === null) {
      console.log('No create endpoint provided');
      return;
    }
    await handleApiResponse(
      async () => await apiClient.POST(endpoints.create!, { body: data }),
      messages.createSuccess,
      messages.createError
    );
  };

  const update = async (data: T) => {
    if (endpoints.update === null) {
      console.log('No update endpoint provided');
      return;
    }
    await handleApiResponse(
      () => apiClient.PUT(endpoints.update!, {params:{path:{id:selectedItem?.id}}, body: data }),
      messages.updateSuccess,
      messages.updateError
    );
  };

  const mutation = useMutation({
    mutationFn: isEdit ? update : create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      navigate('..');
    },
  });

  const handleCancel = () => navigate('..');

  const value = {
    selectedItem,
    isEdit,
    handleSubmit: mutation.mutate,
    handleCancel,
    data
  };

  return (
    <FormPersistenceContext.Provider value={value}>
      {children}
    </FormPersistenceContext.Provider>
  );
}

export function useFormData<T>() {
  const context = useContext(FormPersistenceContext);
  if (!context) {
    throw new Error('useFormNavigation must be used within a FormNavigationProvider');
  }
  return context as FormDataProviderProps<T>;
}
