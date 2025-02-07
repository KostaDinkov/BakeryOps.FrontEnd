
import TitleBar from '../../../../Components/TitleBar/TitleBar'
import ClientFormFields from '../../../../Components/Forms/ClientsForm/ClientsForm'
import { useLocation, useNavigate } from 'react-router';
import { ClientDTO } from '../../../../Types/types';
import { useHandleApiResponse } from '../../../../API/apiUtils';
import { apiClient } from '../../../../API/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import GenericForm from '../../../../Components/GenericForm/GenericForm';

const clientSchema = z.object({

    name: z
      .string({ required_error: "Името на клиента е задължително", invalid_type_error: "Името на клиента е задължително" })
      .min(3,{message:"Името на клиента трябва да е минимум 3 символа"})
      .max(50,{message:"Името на клиента трябва да е максимум 50 символа"}),
    phone: z.string().min(5,{message:"Телефонният номер трябва да е минимум 5 символа"}).max(20).optional(),
    email: z
      .string()
      .email({ message: "Невалиден формат на мейла." })
      .optional()
      .nullable(),
    isCompany: z.coerce.boolean(),
    isSpecialPrice: z.coerce.boolean(),
    hasDiscount:z.coerce.boolean(),
  });

type ClientFormType = z.infer<typeof clientSchema>;

export default function index() {
    const queryClient = useQueryClient();
    const handleApiResponse = useHandleApiResponse();
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedItem } = location.state as { selectedItem: ClientDTO } || { selectedItem: {} as ClientDTO };
    const isEdit = !!selectedItem;

    const mapFieldsToDTO = (data: ClientFormType): ClientDTO => {
        const result:ClientDTO = {
          ...data,
        }
        if(isEdit){
          result.id = selectedItem.id;
        }
        return result;
      }

    const createClient = async (data: ClientDTO) => {
        await handleApiResponse(
            async () =>
                await apiClient.POST('/api/Clients', { body: data }),
            'Клиента е добавен успешно',
            'Клиента не беше добавен!'
        );
    }

    const updateClient = async (data: ClientDTO) => {
        await handleApiResponse(
            async () =>
                await apiClient.PUT('/api/Clients', { body: data }),
            'Клиента е обновен успешно',
            'Клиента не беше обновен!'
        );
    }
    const clientMutation = useMutation({
        mutationFn: selectedItem.id ? updateClient : createClient,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['clients']});
            navigate('..');
        }
    });

  return (
    <div>
      <TitleBar title="Клиенти - Редакция" />
      <GenericForm<ClientFormType, ClientDTO>
        onSubmit={(data)=>{clientMutation.mutate(data)}}
        onCancel={()=>navigate('..')}
        defaultValues={selectedItem}
        zodSchema={clientSchema}
        dtoMapper={mapFieldsToDTO}
        FormFields={ClientFormFields}
      />
    </div>
  )
}
