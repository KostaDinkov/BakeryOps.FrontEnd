import { apiClient } from "../../../API/apiClient";
import GenericCRUDView, {
  IItemOperations,
  IItemsList,
  ItemFormType,
} from "../../../Components/GenericCRUD/GenericCRUD";
import { TextField } from "@mui/material";
import { z } from "zod";
import { VendorDTO } from "../../../Types/types";
import { handleApiResponse } from "../../../API/apiUtils";
import { customInvalidProps } from "../../../system/utils";
import { twoColumnGrid } from "../../../styles/globalStyles.module.css";

export const vendorSchema: z.ZodSchema<VendorDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z
    .string()
    .min(3, { message: "Името на доставчика трябва да е минимум 3 символа" })
    .max(50, {
      message: "Името на доставчика трябва да е максимум 50 символа",
    }),
  address: z.string().min(0).max(50).nullable().default(null),
  phoneNumber: z.string().min(5).max(15).nullable().default(null),
  email: z
    .string()
    .email({ message: "Невалиден формат на мейла" })
    .nullable()
    .default(null),
  description: z
    .string()
    .max(200, { message: "Описанието може да съдържа максимално 200 символа" })
    .nullable()
    .default(null),
});

export default function VendorsPage() {
  const vendorsOperations: IItemOperations<VendorDTO> = {
    getItems: async () =>
      await handleApiResponse(
        async () => await apiClient.GET("/api/Vendors/GetVendors")
      ),
    createItem: async (item: VendorDTO) =>
      await handleApiResponse(
        async () =>
          await apiClient.POST("/api/Vendors/AddVendor", {
            body: item,
          })
      ),

    updateItem: async (item: VendorDTO) =>
      await handleApiResponse(
        async () =>
          await apiClient.PUT("/api/Vendors/UpdateVendor", {
            body: item,
          })
      ),

    deleteItem: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE("/api/Vendors/DeleteVendor/{id}", {
            params: { path: { id } },
          })
      ),

    queryKey: ["vendors"],
  };

  const VendorsList: IItemsList<VendorDTO> = ({ setSelectedItem, data }) => {
    return (
      <div>
        {data &&
          data.map((vendor: VendorDTO) => (
            <div key={vendor.name} onClick={() => setSelectedItem(vendor)}>
              {vendor.name}
            </div>
          ))}
      </div>
    );
  };

  const VendorDetails: React.FC<{ selectedItem: VendorDTO | null }> = ({
    selectedItem,
  }) => {
    return (
      selectedItem && (
        <dl className={twoColumnGrid}>
          <dt>Име</dt>
          <dd>{selectedItem.name}</dd>
          <dt>Адрес</dt>
          <dd>{selectedItem.address}</dd>
          <dt>Телефон</dt>
          <dd>{selectedItem.phoneNumber}</dd>
          <dt>Имейл</dt>
          <dd>{selectedItem.email}</dd>
          <dt>Описание</dt>
          <dd>{selectedItem.description}</dd>
        </dl>
      )
    );
  };

  const VendorForm: ItemFormType<VendorDTO> = ({
    selectedItem,
    handleSave,
    Buttons,
  }) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data: VendorDTO = {
        id: selectedItem?.id,
        name: formData.get("name") as string,
        address: (formData.get("address") as string) || null,
        phoneNumber: (formData.get("phoneNumber") as string) || null,
        email: (formData.get("email") as string) || null,
        description: (formData.get("description") as string) || null,
      };
      handleSave(data);
    }
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          required
          {...customInvalidProps("Името на доставчика е задължително")}
          defaultValue={selectedItem?.name}
          label="Име"
          name="name"
        />
        <TextField
          defaultValue={selectedItem?.phoneNumber}
          label="Телефон"
          name={"phoneNumber"}
        />
        <TextField
          defaultValue={selectedItem?.email}
          label="Имейл"
          name={"email"}
        />

        <TextField
          defaultValue={selectedItem?.address}
          label="Адрес"
          name={"address"}
        />
        <TextField
          defaultValue={selectedItem?.description}
          label="Описание"
          name={"description"}
        />
        <Buttons />
      </form>
    );
  };

  return (
    <GenericCRUDView
      itemSchema={vendorSchema}
      title="Доставчици"
      ItemForm={VendorForm}
      ItemsList={VendorsList}
      ItemDetails={VendorDetails}
      itemOperations={vendorsOperations}
      newBtnText="Добави Доставчик"
    />
  );
}
