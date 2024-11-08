import { DeliveryDTO, MaterialDTO, Unit, VendorDTO } from "../../Types/types";

export default function ItemDetails({
  selectedItem,
  queryData
}: {
  selectedItem: DeliveryDTO | null;
    queryData: { vendors:VendorDTO[], materials:MaterialDTO[], units:Unit[]};
}) {
  return (
    selectedItem && (
      <dl>
        <dt>Документ</dt>
        <dd>{selectedItem.invoiceNumber}</dd>
        <dt>От Дата</dt>
        <dd>{selectedItem.deliveryDate}</dd>
        <dt>Доставчик</dt>
        <dd>{queryData.vendors.find(v=>v.id === selectedItem.vendorId)?.name}</dd>
        <dt>Бележки</dt>
        <dd>{selectedItem.notes}</dd>
        <dt>Стоки</dt>
        <dd>
            
          <ul>
            {selectedItem.items?.map((item) => {
                let material = queryData.materials.find(m=>m.id === item.materialId);
                let materialUnit = queryData.units.find(u=>u.id === material?.unitId)
                return(
              <li key={item.id}>
                {material?.name} {item.quantity} {materialUnit?.name}, Партида: {item.lotNumber}, Годност до: {item.expirationDate}
              </li>
            )})}
          </ul>
        </dd>
    </dl>
    )
  );
}
