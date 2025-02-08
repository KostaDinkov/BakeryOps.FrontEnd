import { ReactNode, createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHandleApiResponse } from '../API/apiUtils';
import { apiClient } from '../API/apiClient';
import {paths} from '../API/apiSchema'
import {PathsWithMethod} from 'openapi-typescript-helpers'



interface FormPersistenceContextType<T> {
  selectedItem: T;
  isEdit: boolean;
  handleSubmit: (data: T) => void;
  handleCancel: () => void;
}

const FormPersistenceContext = createContext<FormPersistenceContextType<any> | undefined>(undefined);

interface ProviderProps<T> {
  children: ReactNode;
  endpoints: {
    create: PathsWithMethod<paths, 'post'>;
    update: PathsWithMethod<paths, 'put'>;
  };
  messages: {
    createSuccess: string;
    createError: string;
    updateSuccess: string;
    updateError: string;
  };
  queryKey: string;
}

export function FormPersistenceProvider<T extends {id?:string}>({
  children,
  endpoints,
  messages,
  queryKey,
}: ProviderProps<T>) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const handleApiResponse = useHandleApiResponse();

  const { selectedItem = {} as T } = location.state || {};
  const isEdit = Object.keys(selectedItem).length > 0;

  const create = async (data: T) => {
    await handleApiResponse(
      async () => await apiClient.POST(endpoints.create, { body: data }),
      messages.createSuccess,
      messages.createError
    );
  };

  const update = async (data: T) => {
    await handleApiResponse(
      () => apiClient.PUT(endpoints.update, { body: data }),
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
  };

  return (
    <FormPersistenceContext.Provider value={value}>
      {children}
    </FormPersistenceContext.Provider>
  );
}

export function useFormPersistence<T>() {
  const context = useContext(FormPersistenceContext);
  if (!context) {
    throw new Error('useFormNavigation must be used within a FormNavigationProvider');
  }
  return context as FormPersistenceContextType<T>;
}
