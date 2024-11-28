import GenericCRUDView, {
  IItemOperations,
  ItemFormType,
} from "../../../Components/GenericCRUD/GenericCRUD";
import {
  Autocomplete,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { apiClient } from "../../../API/apiClient";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { z } from "zod";
import {
  CategoryDTO,
  MaterialDTO,
  Unit,
  VendorDTO,
} from "../../../Types/types";
import { useItemsQuery } from "../../../API/crudOperations";
import { handleApiResponse } from "../../../API/apiUtils";
import { useState } from "react";

// Define the schema for client formData parsing and validation
//@ts-ignore
const materialSchema: z.ZodSchema<MaterialDTO> = z.object({
  
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string({required_error:"Въведете име на продукта", invalid_type_error:"Името на продукта трябва да бъде между 3 и 50 символа"}).min(3).max(50),
  description: z.string().max(200).nullable().default(null).optional(),
  unitId: z.string({required_error:"Изберете мерна единица"}).uuid(),
  vendorId: z.string({required_error:"Изберете доставчик"}).uuid(),
  categoryId: z.string({required_error:"Изберете категория на продукта"}).uuid(),
  latestPrice: z.coerce.number({required_error:"Актуалната цена трябва да е положително число"}).positive().default(0),
});

export default function MaterialsPage() {
  const categoriesQuery = useItemsQuery({
    queryKey: "categories",
    url: "/api/Categories/GetCategories",
  });
  const vendorsQuery = useItemsQuery({
    queryKey: "vendors",
    url: "/api/Vendors/GetVendors",
  });
  const unitsQuery = useItemsQuery({
    queryKey: "units",
    url: "/api/Units/GetUnits",
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
    getItems: async () =>
      await handleApiResponse(
        async () => await apiClient.GET("/api/Materials/GetMaterials")
      ),

    createItem: async (item: MaterialDTO) =>
      handleApiResponse(
        async () =>
          await apiClient.POST("/api/Materials/AddMaterial", {
            body: item,
          })
      ),

    updateItem: async (item: MaterialDTO) =>
      await handleApiResponse(
        async () =>
          await apiClient.PUT("/api/Materials/UpdateMaterial", {
            body: item,
          })
      ),

    deleteItem: async (id: string | number) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE("/api/Materials/DeleteMaterial/{id}", {
            params: { path: { id: String(id) } },
          })
      ),

    queryKey: ["materials"],
  };

  // Custom view for the clients list
  const MaterialsList: React.FC<{
    setSelectedItem: React.Dispatch<MaterialDTO | null>;
    data: MaterialDTO[];
  }> = ({ setSelectedItem, data }) => {
    
    let byCategory = Object.groupBy(data, (m: MaterialDTO) => m.categoryId) as {
      [key: string]: MaterialDTO[];
    };
    return (
      byCategory &&
      Object.keys(byCategory).map((categoryId) => (
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
              {byCategory[categoryId]?.map((material: MaterialDTO) => {
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
            <dd>
              {unitsQuery.data?.find((u) => u.id === selectedItem.unitId)?.name}
            </dd>
            <dt>Актуална Цена</dt>
            <dd>{selectedItem?.latestPrice} лв.</dd>
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

  const MaterialForm: ItemFormType<MaterialDTO> = ({ selectedItem, handleSave, Buttons }) => {

    const units= unitsQuery.data as Unit[];
    const vendors = vendorsQuery.data as VendorDTO[];
    const categories = categoriesQuery.data as CategoryDTO[];

    const [formData, setFormData] = useState<MaterialDTO | null>(selectedItem);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData === null) {
        handleSave({});
        return;
      }
        
      handleSave(formData);
    }
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Име"
          value={formData?.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value } as MaterialDTO)}
        />
        <Autocomplete
        options={units} 
        getOptionLabel={(option) => option.name || ""}
        onChange={(event, value) => {
          setFormData({ ...formData, unitId: value?.id } as MaterialDTO);
        }}
        value={units.find((u) => u.id === formData?.unitId) || null}
        renderInput={function (
          params: AutocompleteRenderInputParams
        ): React.ReactNode {
          return <TextField {...params} label="Мерна единица" />;
        }}
      />

        
        <TextField
          type="number"
          label="Актуална Цена"
          name="latestPrice"
          id="latestPrice"
          slotProps={{htmlInput:{ step: "0.01" }}}
          value={formData?.latestPrice || ""}
          onChange = {(e) => setFormData({ ...formData, latestPrice: parseFloat(e.target.value) } as MaterialDTO)}
        />
        <Autocomplete
          
          options={categories}
          getOptionLabel={(option) => option.name || ""}
          value={categories.find((c) => c.id === formData?.categoryId) || null}
          onChange={(event, value) => {
            setFormData({ ...formData, categoryId: value?.id } as MaterialDTO);
          }}
          renderInput={function (
            params: AutocompleteRenderInputParams
          ): React.ReactNode {
            return <TextField {...params} label="Категория" />;
          }}
        />

        <Autocomplete
          options={vendors}
          getOptionLabel={(option) => option.name || ""}
          value={vendors.find((v) => v.id === formData?.vendorId) || null}
          onChange={(event, value) => {
            setFormData({ ...formData, vendorId: value?.id } as MaterialDTO);
          }}
          renderInput={function (
            params: AutocompleteRenderInputParams
          ): React.ReactNode {
            return <TextField {...params} label="Доставчик" />;
          }}

        />

        <TextField
          label="Описание"
          id="description"
          name="description"
          value={formData?.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value } as MaterialDTO)}
        />
        <Buttons/>
      </form>
    );
  };

  if (categoriesQuery.isLoading|| vendorsQuery.isLoading || unitsQuery.isLoading) {
    return <div>Loading data from queries...</div>;
  }
  return (
    <GenericCRUDView
      title="Стоки"
      ItemsList={MaterialsList}
      ItemForm={MaterialForm}
      ItemDetails={MaterialDetails}
      itemSchema={materialSchema}
      itemOperations={materialOperations}
      newBtnText="Добави Стока"
    />
  );
}
