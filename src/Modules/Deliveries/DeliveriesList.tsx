import { DeliveryDTO } from "../../Types/types";

export default function ({
  setSelectedItem,
  fetchResponse,
}: {
  setSelectedItem: React.Dispatch<DeliveryDTO | null>;
  fetchResponse: {data: DeliveryDTO[], error:any, response:Response};
}) {
  return (
    <>
      <ul>
        {fetchResponse.data.map((delivery) => (
          <li key={delivery.id} onClick={() => setSelectedItem(delivery)}>
            {delivery.invoiceNumber} от {delivery.deliveryDate}
          </li>
        ))}
      </ul>
    </>
  );
}
