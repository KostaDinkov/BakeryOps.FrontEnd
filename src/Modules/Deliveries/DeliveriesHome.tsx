import GenericCRUDView from "../../Components/GenericCRUD/GenericCRUD";
import { DeliveryDTO, MaterialDTO, Unit, VendorDTO } from "../../Types/types";
import { deliveryOperations } from "./deliveryOperations";
import { deliverySchema } from "./deliverySchema";
import DeliveriesList from "./DeliveriesList";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryFormFields from "./DeliveryFormFields";
import { useItemsQuery } from "../../API/crudOperations";

export default function DeliveriesHome() {
  const vendorsQuery = useItemsQuery({
    queryKey: "vendors",
    url: "/api/Vendors/GetVendors",
  });
  const materialsQuery = useItemsQuery({
    queryKey: "materials",
    url: "/api/Materials/GetMaterials",
  });
  const unitsQuery = useItemsQuery({
    queryKey: "units",
    url: "/api/Units/GetUnits",
  });

  const ItemDetails = ({
    selectedItem,
  }: {
    selectedItem: DeliveryDTO | null;
  }) => {
    return (
      <DeliveryDetails
        selectedItem={selectedItem}
        queryData={{
          vendors: vendorsQuery.data as unknown as VendorDTO[],
          materials: materialsQuery.data as unknown as MaterialDTO[],
          units: unitsQuery.data as unknown as Unit[],
        }}
      />
    );
  };

  const ItemFormFields = ({
    selectedItem,
    handleSave,
    Buttons,
  }: {
    selectedItem: DeliveryDTO | null;
    handleSave: (e: any) => void;
    Buttons: React.FC;
  }) => {
    return (
      <DeliveryFormFields
        selectedItem={selectedItem}
        queryData={{
          vendors: vendorsQuery.data as unknown as VendorDTO[],
          materials: materialsQuery.data as unknown as MaterialDTO[],
          units: unitsQuery.data as unknown as Unit[],
        }}
        handleSave={handleSave}
        Buttons={Buttons}
      />
    );
  };

  return (
    <GenericCRUDView
      title={"Доставки"}
      ItemForm={ItemFormFields}
      ItemsList={DeliveriesList}
      ItemDetails={ItemDetails}
      itemSchema={deliverySchema}
      itemOperations={deliveryOperations}
    />
  );
}
