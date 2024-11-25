import GenericCRUDView from "../Nomenclature/GenericCRUD/GenericCRUD";
import { apiClient } from "../../API/apiClient";
import { DeliveryDTO, DeliveryItemDTO, MaterialDTO, Unit, VendorDTO } from "../../Types/types";
import { deliveryOperations } from "./deliveryOperations";
import { deliverySchema } from "./deliverySchema";
import DeliveriesList from "./DeliveriesList";
import DeliveryDetails from "./ItemDetails";
import { useQuery } from "@tanstack/react-query";
import DeliveryFormFields from "./DeliveryFormFields";

export default function DeliveriesHome() {
  const vendorsQuery = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Vendors/GetVendors");
      return response.data;
    },
  });
  const materialsQuery = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Materials/GetMaterials");
      return response.data;
    },
  });

  const unitsQuery = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Units/GetUnits");
      return response.data;
    },
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
    onCancel,
    handleSave,
    Buttons
  }: {
    selectedItem: DeliveryDTO | null;
    onCancel: () => void;
    handleSave: (e: any) => void;
  }) => {
    return (
      <DeliveryFormFields
        selectedItem={selectedItem}
        queryData={{
          vendors: vendorsQuery.data as unknown as VendorDTO[],
          materials: materialsQuery.data as unknown as MaterialDTO[],
          units: unitsQuery.data as unknown as Unit[],
        }}
        onCancel={onCancel}
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
