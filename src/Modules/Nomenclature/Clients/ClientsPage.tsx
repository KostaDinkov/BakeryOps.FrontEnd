import GenericCRUDView, {
  IItemOperations,
  ItemFormType,
} from "../../../Components/GenericCRUD/GenericCRUD";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { apiClient } from "../../../API/apiClient";
import { components } from "../../../API/apiSchema";
import { z } from "zod";
import { handleApiResponse } from "../../../API/apiUtils";
import { customInvalidProps } from "../../../system/utils";


type ClientDTO = components["schemas"]["ClientDTO"];

export default function ClientsPage() {
  // Define the schema for client formData parsing and validation
  const clientSchema: z.ZodSchema<ClientDTO> = z.object({
    id: z.string().default("00000000-0000-0000-0000-000000000000"),
    name: z
      .string({ required_error: "Името на клиента е задължително", invalid_type_error: "Името на клиента е задължително" })
      .min(3,{message:"Името на клиента трябва да е минимум 3 символа"})
      .max(50,{message:"Името на клиента трябва да е максимум 50 символа"}),
    phone: z.string().min(5,{message:"Телефонният номер трябва да е минимум 5 символа"}).max(20).nullable().default(null),
    email: z
      .string()
      .email({ message: "Невалиден формат на мейла." })
      .nullable()
      .default(null),
    isCompany: z.coerce.boolean(),
    isSpecialPrice: z.coerce.boolean(),
    discountPercent: z.coerce.number().int().default(20),
  });
  const clientsOperations: IItemOperations<ClientDTO> = {
    getItems: async () =>
      await handleApiResponse(async () => apiClient.GET("/api/Clients")),

    createItem: async (item: ClientDTO) =>
      await handleApiResponse(
        async () => await apiClient.POST("/api/Clients", { body: item })
      ),

    updateItem: async (item: ClientDTO) =>
      await handleApiResponse(
        async () => await apiClient.PUT("/api/Clients", { body: item })
      ),

    deleteItem: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE(`/api/Clients/{id}`, {
            params: { path: { id: id } },
          })
      ),

    queryKey: ["clients"],
  };

  // Custom view for the clients list
  const ClientsList: React.FC<{
    setSelectedItem: React.Dispatch<ClientDTO | null>;
    data: any; //TODO fix this
  }> = ({ setSelectedItem, data }) => {
    return (
      <div>
        {data &&
          data.map((client: ClientDTO) => (
            <div key={client.id} onClick={() => setSelectedItem(client)}>
              {client.name}
            </div>
          ))}
      </div>
    );
  };

  // Custom view for the client details
  const ClientDetails: React.FC<{ selectedItem: ClientDTO | null }> = ({
    selectedItem,
  }) => {
    return (
      selectedItem && (
        <dl>
          <dt>Име</dt>
          <dd>{selectedItem.name}</dd>
          <dt>Телефон</dt>
          <dd>{selectedItem.phone}</dd>
          <dt>Мейл</dt>
          <dd>{selectedItem.email}</dd>
          <dt>Компания?</dt>
          <dd>{selectedItem.isCompany ? "Да" : "Не"}</dd>
          <dt>Ползва специални цени?</dt>
          <dd>{selectedItem.isSpecialPrice ? "Да" : "Не"}</dd>
        </dl>
      )
    );
  };

  // Custom form fields for the client
  const ClientForm: ItemFormType<ClientDTO> = ({
    selectedItem,
    handleSave,
    Buttons,
  }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const clientDto: ClientDTO = {
        id: selectedItem?.id || undefined,
        name: (formData.get("name") as string) || null,
        phone: (formData.get("phone") as string) || null,
        email: (formData.get("email") as string) || null,
        isCompany: formData.get("isCompany") === "on" || false,
        isSpecialPrice: formData.get("isSpecialPrice") === "on" || false,
        discountPercent:
          parseInt(formData.get("discountPercent") as string) || 0,
      };

      handleSave(clientDto);
    };

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Име"
          name="name"
          {...customInvalidProps("Името на клиента е задължително")}
          defaultValue={selectedItem?.name || ""}
        />
        <TextField
          label="Телефон"
          defaultValue={selectedItem?.phone || null}
          name="phone"
        />
        <TextField
          label="Мейл"
          name="email"
          defaultValue={selectedItem?.email || null}
        />
        <FormControlLabel
          label="Компания?"
          labelPlacement="start"
          control={
            <Checkbox
              name="isCompany"
              defaultChecked={selectedItem?.isCompany || false}
            />
          }
        />
        <FormControlLabel
          label="Ползва специални цени?"
          labelPlacement="start"
          control={
            <Checkbox
              name="isSpecialPrice"
              defaultChecked={selectedItem?.isSpecialPrice || false}
            />
          }
        />

        {/* <TextField
          label="Отстъпка (%)"
          id="discountPercent"
          name="discountPercent"
          defaultValue={selectedItem?.discountPercent}
        /> */}
        <Buttons />
      </form>
    );
  };

  return (
    <GenericCRUDView
      title="Clients"
      ItemsList={ClientsList}
      ItemForm={ClientForm}
      ItemDetails={ClientDetails}
      itemSchema={clientSchema}
      itemOperations={clientsOperations}
      newBtnText="Добави Клиент"
    />
  );
}
