import TitleBar from "../../../Components/TitleBar/TitleBar";
import { FormDataProvider } from "../../../Components/GenericForm/FormDataProvider";
import { DeliveryDTO } from "../../../Types/types";
import { DeliveryFormType } from "../../../Components/Forms/DeliveryForm/deliverySchema";
import { deliverySchema } from "../../../Components/Forms/DeliveryForm/deliverySchema";
import DeliveryFormFields from "../../../Components/Forms/DeliveryForm/DeliveryForm";
import { useMaterialsQuery, useVendorsQuery } from "../../../API/Queries/queryHooks";

export default function DeliveriesFormIndex() {
  const vendorsQuery = useVendorsQuery();
  const materialsQuery = useMaterialsQuery();

  const dtoMapper = (data: DeliveryFormType, selectedItem?: DeliveryDTO) => {
    return {
      ...selectedItem,
      ...data,
      items: data.items.map(item => ({ ...item, materialId: item.materialId }))
    };
  };

  if (vendorsQuery.isLoading || materialsQuery.isLoading) 
    return <div>Loading vendors and materials</div>;
  if (vendorsQuery.isError || materialsQuery.isError) 
    return <div>Error loading vendors or materials</div>;

  return (
    <>
      <TitleBar title="Доставки - редактиране" />
      <FormDataProvider<DeliveryFormType, DeliveryDTO>
        endpoints={{
          create: "/api/Deliveries/Create",
          update: "/api/Deliveries/Update",
        }}
        messages={{
          createSuccess: "",
          createError: "",
          updateSuccess: "",
          updateError: "",
        }}
        queryKey={"deliveries"}
        data={{ vendors: vendorsQuery.data, materials: materialsQuery.data }}
        zodSchema={deliverySchema}
        dtoMapper={dtoMapper}
        FormFields={DeliveryFormFields}
      />
    </>
  );
}
