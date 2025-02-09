import TitleBar from "../../../../Components/TitleBar/TitleBar";
import ClientFormFields, {
  ClientFormType,
  clientSchema,
} from "../../../../Components/Forms/ClientsForm/ClientsForm";
import { ClientDTO } from "../../../../Types/types";
import { FormDataProvider } from "../../../../Providers/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/NavigatedForm";

export default function Index() {
  const mapFieldsToDTO = (
    data: ClientFormType,
    selectedItem: ClientDTO
  ): ClientDTO => {
    const result: ClientDTO = {
      ...data,
    };
    if (selectedItem && Object.keys(selectedItem).length > 0) {
      result.id = selectedItem.id;
    }
    return result;
  };

  return (
    <FormDataProvider<ClientDTO>
      endpoints={{
        create: "/api/Clients",
        update: "/api/Clients",
      }}
      messages={{
        createSuccess: "Клиента е добавен успешно",
        createError: "Клиента не беше добавен!",
        updateSuccess: "Клиента е обновен успешно",
        updateError: "Клиента не беше обновен!",
      }}
      queryKey="clients"
      
    >
      <TitleBar title="Клиенти - Редакция" />
      <FormWithData<ClientFormType, ClientDTO>
        zodSchema={clientSchema}
        FormFields={ClientFormFields}
        dtoMapper={undefined}
      />
    </FormDataProvider>
  );
}
