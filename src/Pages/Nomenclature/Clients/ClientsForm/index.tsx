import TitleBar from "../../../../Components/TitleBar/TitleBar";
import ClientFormFields, {
  ClientFormType,
  clientSchema,
} from "../../../../Components/Forms/ClientsForm/ClientsForm";
import { ClientDTO } from "../../../../Types/types";
import { FormDataProvider } from "../../../../Components/GenericForm/FormDataProvider";
import FormWithData from "../../../../Components/GenericForm/FormWithData";

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
    <>
      <TitleBar title="Клиенти - Редакция" />
      <FormDataProvider<ClientDTO, ClientFormType>
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
        zodSchema={clientSchema}
        FormFields={ClientFormFields}
        dtoMapper={undefined}
      />
    </>
  );
}
