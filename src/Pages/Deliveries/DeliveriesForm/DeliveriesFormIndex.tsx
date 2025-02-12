import FormWithData from "../../../Components/GenericForm/FormWithData";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { FormDataProvider } from "../../../Providers/FormDataProvider";
import { DeliveryDTO } from "../../../Types/types";
import { DeliveryFormType } from "../../../Components/Forms/DeliveryForm/deliverySchema";
import {deliverySchema} from "../../../Components/Forms/DeliveryForm/deliverySchema";
import DeliveryFormFields from "../../../Components/Forms/DeliveryForm/DeliveryForm";
import { useMaterialsQuery, useVendorsQuery } from "../../../API/Queries/queryHooks";

export default function DeliveriesFormIndex() {

  const vendorsQuery = useVendorsQuery();
  const materialsQuery = useMaterialsQuery();

  if(vendorsQuery.isLoading || materialsQuery.isLoading) return <div>Loading vendors and materials</div>
  if(vendorsQuery.isError || vendorsQuery.isError) return <div>Error loading vendors or materials</div>
  return (
    <>
      <TitleBar title="Доставки - редактиране" />
      <FormDataProvider
        endpoints={{
          create: "/api/Vendors/AddVendor",
          update: "/api/Vendors/UpdateVendor",
        }}
        messages={{
          createSuccess: "",
          createError: "",
          updateSuccess: "",
          updateError: "",
        }}
        queryKey={""}
        data={{vendors:vendorsQuery.data, materials:materialsQuery.data}}
      >
        <FormWithData<DeliveryFormType, DeliveryDTO>
          zodSchema={deliverySchema}
          FormFields={DeliveryFormFields}
        />
      </FormDataProvider>
    </>
  );
}
