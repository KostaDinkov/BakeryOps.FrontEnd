
import TitleBar from "../../../../Components/TitleBar/TitleBar";
import { MaterialDTO } from "../../../../Types/types";
import { FormDataProvider } from "../../../../Providers/FormDataProvider";
import { useCategoriesQuery, useUnitsQuery, useVendorsQuery } from "../../../../API/Queries/queryHooks";
import FormWithData from "../../../../Components/GenericForm/FormWithData";
import MaterialFormFields, { materialFormSchema, MaterialFormType } from "../../../../Components/Forms/MaterialsForm/MaterialsFormFields";
import {isV4uuid} from "../../../../system/utils";
export default function MaterialsFormIndex() {
  const categoriesQuery = useCategoriesQuery();
  const vendorsQuery = useVendorsQuery();
  const unitsQuery = useUnitsQuery();
  
  if (categoriesQuery.isLoading || vendorsQuery.isLoading || unitsQuery.isLoading) return <div>Loading additional data...</div>;
  if (categoriesQuery.isError || vendorsQuery.isError || unitsQuery.isError) return <div>Error loading additional data</div>;

  function dtoMapper(formData: MaterialFormType, selectedItem:MaterialDTO | undefined): MaterialDTO {

    let result: MaterialDTO = {
      id: selectedItem && selectedItem.id,
      name: formData.name,
      description: formData.description,
      latestPrice: formData.latestPrice,
      categoryId: selectedItem?.categoryId,
      vendorId: selectedItem?.vendorId,
      unitId: selectedItem?.unitId
    };

    if(isV4uuid(formData.categoryName)){
      result.categoryId = formData.categoryName;
    }
    
    else if(formData.categoryName){
  
      result.categoryName = formData.categoryName;
    }

    if(isV4uuid(formData.vendorName)){
      result.vendorId = formData.vendorName;
    }
    
    else if(formData.vendorName){
      result.vendorName = formData.vendorName;
    }
    
    if(isV4uuid(formData.unitName)){
      result.unitId = formData.unitName;
    }
    else if(formData.unitName){
      result.unitName = formData.unitName;
    }

    return result;
  
  }

  return (
    <>
      <TitleBar title={"Стоки - редактиране"} />
      <FormDataProvider<MaterialDTO>
        endpoints={{
          create: "/api/Materials/AddMaterial",
          update: "/api/Materials/UpdateMaterial",
        }}
        messages={{
          createSuccess: "Стоката е добавен успешно",
          createError: "Стоката не беше добавен!",
          updateSuccess: "Стоката е обновен успешно",
          updateError: "Стоката не беше обновен!",
        }}
        queryKey={"materials"}
        data={{categories:categoriesQuery.data, units:unitsQuery.data, vendors:vendorsQuery.data}}
      >
        <FormWithData<MaterialFormType, MaterialDTO>
          zodSchema={materialFormSchema}
          FormFields={MaterialFormFields}
          dtoMapper={dtoMapper}
        />
      </FormDataProvider>
    </>
  );
}
 

