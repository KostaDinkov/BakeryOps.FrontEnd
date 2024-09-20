import { UseQueryResult, useQuery } from "@tanstack/react-query";
import GenericCRUDView, { IItemOperations } from "../GenericCRUD/GenericCRUD";
import Select from "react-select";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { apiClient } from "../../../API/apiClient";
import { components } from "../../../API/apiSchema";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { z } from "zod";

type MaterialDTO = components["schemas"]["MaterialDTO"];
type CategoryDTO = components["schemas"]["CategoryDTO"];
type VendorDTO = components["schemas"]["VendorDTO"];

// Define the schema for client formData parsing and validation
//@ts-ignore
const materialSchema: z.ZodSchema<MaterialDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string().min(3).max(50),
  description: z.string().max(200).nullable().default(null).optional(),
  unit: z.string().nullable(),
  vendorId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export default function MaterialsPage() {
  const categoriesQuery: UseQueryResult<CategoryDTO[], Error> = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Categories/GetCategories");
      return response.data;
    },
  });

  const vendorsQuery: UseQueryResult<VendorDTO[], Error> = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Vendors/GetVendors");
      return response.data;
    },
  });

  const getCategoryDTO = (id: string) => {
    if (categoriesQuery.data === undefined) {
      throw new Error("CategoriesQuery: Categories data is undefined");
    }
    const categoryDTO = categoriesQuery.data.filter((c) => c.id === id)[0];
    if (categoryDTO === undefined) {
      throw new Error("CategoriesQuery: Category not found");
    }
    return categoryDTO;
  };
  const getVendorDTO = (id: string) => {
    if (vendorsQuery.data === undefined) {
      throw new Error("VendorsQuery: Vendors data is undefined");
    }
    const vendorDTO = vendorsQuery.data.filter((v) => v.id === id)[0];
    if (vendorDTO === undefined) {
      throw new Error("VendorsQuery: Vendor not found");
    }
    return vendorDTO;
  };

  // functions to create, update and delete clients, that use tanstack-query, and automatically invalidate the clients query
  const materialOperations: IItemOperations<MaterialDTO> = {
    getItems: async () => {
      const response = await apiClient.GET("/api/Materials/GetMaterials");
      return response.data as unknown as MaterialDTO[];
    },
    createItem: async (item: MaterialDTO) => {
      const response = await apiClient.POST("/api/Materials/AddMaterial", {
        body: item,
      });
      return response.data as unknown as MaterialDTO; // Return the data property of the response
    },
    updateItem: async (item: MaterialDTO) => {
      const response = await apiClient.PUT("/api/Materials/UpdateMaterial", {
        body: item,
      });
      return response.data as unknown as MaterialDTO;
    },
    deleteItem: async (id: string | number) => {
      await apiClient.DELETE("/api/Materials/DeleteMaterial/{id}", {
        params: { path: { id: String(id) } },
      });
      return;
    },
    queryKey: ["materials"],
  };

  // Custom view for the clients list
  const MaterialsList: React.FC<{
    setSelectedItem: React.Dispatch<MaterialDTO | null>;
    data: any;
  }> = ({ setSelectedItem, data }) => {
    //@ts-ignore
    data = Object.groupBy(data, (m: MaterialDTO) => m.categoryId) as {
      [key: string]: MaterialDTO[];
    };
    return (
      data &&
      Object.keys(data).map((categoryId) => (
        <Accordion key={categoryId} defaultExpanded>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3>{getCategoryDTO(categoryId)?.name}</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {data[categoryId].map((material: MaterialDTO) => {
                return (
                  <li
                    key={material.id}
                    onClick={() => setSelectedItem(material)}
                  >
                    {material.name}
                  </li>
                );
              })}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))
    );
  };

  // Custom view for the client details
  const MaterialDetails: React.FC<{ selectedItem: MaterialDTO | null }> = ({
    selectedItem,
  }) => {
    return (
      <div>
        {selectedItem !== null ? (
          <dl>
            <dt>Име</dt>
            <dd>{selectedItem?.name}</dd>
            <dt>Мярка</dt>
            <dd>{selectedItem?.unit}</dd>
            <dt>Категория</dt>
            <dd>{getCategoryDTO(selectedItem?.categoryId)?.name}</dd>
            <dt>Доставчик</dt>
            <dd>{getVendorDTO(selectedItem?.vendorId)?.name}</dd>
            <dt>Бележки</dt>
            <dd>{selectedItem?.description}</dd>
          </dl>
        ) : null}
      </div>
    );
  };

  const MaterialFormFields: React.FC<{
    selectedItem: MaterialDTO | null;
  }> = ({ selectedItem }) => {
    return (
      <>
        <TextField
          label="Име"
          id="name"
          name="name"
          defaultValue={selectedItem?.name}
        />
        <TextField
          label="Мярка"
          id="unit"
          name="unit"
          defaultValue={selectedItem?.unit}
        />

        <Select
          options={categoriesQuery.data?.map(
            (category) => ({ value: category.id, label: category.name } as any)
          )}
          name="categoryId"
          defaultValue={
            selectedItem
              ? {
                  value: selectedItem?.categoryId,
                  label: getCategoryDTO(selectedItem?.categoryId)?.name,
                }
              : undefined
          }
        />

        <Select
          name="vendorId"
          options={vendorsQuery.data?.map(
            (vendor) => ({ value: vendor.id, label: vendor.name } as any)
          )}
          defaultValue={
            selectedItem
              ? {
                  value: selectedItem?.vendorId,
                  label: getVendorDTO(selectedItem?.vendorId)?.name,
                }
              : undefined
          }
        />

        <TextField
          label="Описание"
          id="description"
          name="description"
          defaultValue={selectedItem?.description}
        />
      </>
    );
  };

  if (categoriesQuery.data === undefined || vendorsQuery.data === undefined) {
    return <div>Loading data from queries...</div>;
  }
  return (
    <GenericCRUDView
      title="Стоки"
      ItemsList={MaterialsList}
      ItemFormFields={MaterialFormFields}
      ItemDetails={MaterialDetails}
      itemSchema={materialSchema}
      itemOperations={materialOperations}
      newBtnText="Добави Стока"
    />
  );
}
