//TODO update details view
import { components } from "../../../API/apiSchema";
import { apiClient } from "../../../API/apiClient";
import GenericCRUDView, { IItemOperations } from "../GenericCRUD/GenericCRUD";
import { TextField } from "@mui/material";
import { z } from "zod";

type VendorDTO = components["schemas"]["VendorDTO"];

export const vendorSchema: z.ZodSchema<VendorDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string().min(3).max(50),
  address: z.string().min(0).max(50).nullable().default(null),
  phoneNumber: z.string().min(0).max(50).nullable().default(null),
  email: z.string().email().nullable().default(null),
  description: z.string().nullable().default(null),
});


export default function VendorsPage() {
  const vendorsOperations:IItemOperations<VendorDTO> = {
    getItems: async()=>{
      const response = await apiClient.GET("/api/Vendors/GetVendors");
      return response.data as unknown as VendorDTO[];
    },
    createItem: async (item: VendorDTO) => {
      const response = await apiClient.POST("/api/Vendors/AddVendor", {
        body: item,
      });
      return response.data as unknown as VendorDTO;
    },
    updateItem: async (item: VendorDTO) => {
      const response = await apiClient.PUT("/api/Vendors/UpdateVendor", {
        body: item,
      });
      return response.data as unknown as VendorDTO;
    },
    deleteItem: async (id: string | number) => {
      await apiClient.DELETE("/api/Vendors/DeleteVendor/{id}", {
        params: { path: { id:String(id) } },
      });
    },
    queryKey: ["vendors"],
  };

  const VendorsList: React.FC<{
    setSelectedItem: React.Dispatch<VendorDTO | null>;
    data: VendorDTO[];
  }> = ({ setSelectedItem, data }) => {
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
        <dl>
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

  const VendorFormFields = ({
    selectedItem,
  }: {
    selectedItem: VendorDTO | null;
  }) => {
    return (
      <>
        <TextField defaultValue={selectedItem?.name} label="Име" name="name" />
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
      </>
    );
  };

  return (
    <GenericCRUDView
      itemSchema={vendorSchema}
      title="Доставчици"
      ItemFormFields={VendorFormFields}
      ItemsList={VendorsList}
      ItemDetails={VendorDetails}
      itemOperations={vendorsOperations}
      
    />
  );
}
