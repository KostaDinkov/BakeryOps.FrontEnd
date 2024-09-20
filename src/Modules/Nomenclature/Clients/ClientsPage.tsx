import GenericCRUDView, { IItemOperations } from "../GenericCRUD/GenericCRUD";
import { Checkbox, TextField } from "@mui/material";
import { apiClient } from "../../../API/apiClient";
import { components } from "../../../API/apiSchema";

import { z } from "zod";

type ClientDTO = components["schemas"]["ClientDTO"];

export default function ClientsPage() {
  const clientsOperations: IItemOperations<ClientDTO> = {
    getItems: async () => {
      const response = await apiClient.GET("/api/Clients");
      return response.data as unknown as ClientDTO[];
    },

    createItem: async (item: ClientDTO) => {
      const response = await apiClient.POST("/api/Clients", { body: item });
      return response.data as unknown as ClientDTO; // Return the data property of the response
    },
    updateItem: async (item: ClientDTO) => {
      const response = await apiClient.PUT("/api/Clients", { body: item });
      return response.data as unknown as ClientDTO;
    },
    deleteItem: async (id: string) => {
      await apiClient.DELETE(`/api/Clients/{id}`, {
        params: { path: { id: id } },
      });
      return;
    },
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
            <div key={client.name} onClick={() => setSelectedItem(client)}>
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

  // Define the schema for client formData parsing and validation
  const clientSchema: z.ZodSchema<ClientDTO> = z.object({
    id: z.string().default("00000000-0000-0000-0000-000000000000"),
    name: z.string().min(3).max(50),
    phone: z.string().min(5).max(20).nullable().default(null),
    email: z.string().email().nullable().default(null),
    isCompany: z.coerce.boolean(),
    isSpecialPrice: z.coerce.boolean(),
    discountPercent: z.coerce.number().int().default(20),
  });

  // Custom form fields for the client
  const ClientFormFields: React.FC<{ selectedItem: ClientDTO | null }> = ({
    selectedItem,
  }) => {
    return (
      <>
        <TextField
          label="Име"
          id="name"
          name="name"
          defaultValue={selectedItem?.name}
        />
        <TextField
          label="Телефон"
          id="phone"
          name="phone"
          defaultValue={selectedItem?.phone}
        />
        <TextField
          label="Мейл"
          id="email"
          name="email"
          defaultValue={selectedItem?.email}
        />
        <Checkbox
          id="isCompany"
          name="isCompany"
          defaultChecked={selectedItem?.isCompany}
        />
        <Checkbox
          id="isSpecialPrice"
          name="isSpecialPrice"
          defaultChecked={selectedItem?.isSpecialPrice}
        />
        <TextField
          label="Отстъпка (%)"
          id="discountPercent"
          name="discountPercent"
          defaultValue={selectedItem?.discountPercent}
        />
      </>
    );
  };

  return (
    <GenericCRUDView
      title="Clients"
      ItemsList={ClientsList}
      ItemFormFields={ClientFormFields}
      ItemDetails={ClientDetails}
      itemSchema={clientSchema}
      itemOperations={clientsOperations}
      newBtnText="Добави Клиент"
    />
  );
}
