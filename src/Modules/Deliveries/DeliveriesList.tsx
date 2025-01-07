import { DeliveryDTO } from "../../Types/types";

export default function ({
  setSelectedItem,
  data,
}: {
  setSelectedItem: React.Dispatch<DeliveryDTO | null>;
  data: DeliveryDTO[];
}) {
  return (
    <>
      <ul>
        {data.map((delivery) => (
          <li key={delivery.id} onClick={() => setSelectedItem(delivery)}>
            {delivery.vendorName} от {delivery.deliveryDate}
          </li>
        ))}
      </ul>
    </>
  );
}
