import { useLocation, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHandleApiResponse } from '../../API/apiUtils';
import { apiClient } from '../../API/apiClient';
import { paths } from '../../API/apiSchema';
import { PathsWithMethod } from 'openapi-typescript-helpers';
import GenericForm from "./GenericForm";
import { ZodSchema } from "zod";
import { FieldValues } from 'react-hook-form';

// Updated interface to include GenericForm props and remove children.
interface ProviderProps<TForm, T> {
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
  data?: Record<string, any>;
  zodSchema: ZodSchema<TForm>;
  dtoMapper?: (data: TForm, selectedItem?: T) => T;
  FormFields: React.FC<{data: Record<string, any> | undefined}>;
}

export function FormDataProvider<T extends { id?: string }, TForm extends FieldValues>({
  endpoints,
  messages,
  queryKey,
  data,
  zodSchema,
  dtoMapper,
  FormFields
}: ProviderProps<TForm,T>) {
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
      () => apiClient.POST(endpoints.create!, { body: data }),
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
      () => apiClient.PUT(endpoints.update!, { params: { path: { id: selectedItem?.id } }, body: data }),
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

  // Return the GenericForm directly with the mapped props.
  return (
    <GenericForm<TForm, T>
      onSubmit={mutation.mutate}
      onCancel={handleCancel}
      defaultValues={selectedItem}
      zodSchema={zodSchema}
      dtoMapper={dtoMapper}
      FormFields={FormFields}
      data={data}
    />
  );
}
