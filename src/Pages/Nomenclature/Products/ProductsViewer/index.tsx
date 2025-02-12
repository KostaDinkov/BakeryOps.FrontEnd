import { useNavigate } from "react-router";
import { useProductsQuery } from "../../../../API/Queries/queryHooks";
import GenericCrud2 from "../../../../Components/GenericCRUD2/GenericCrud2";
import QueryViewWrapper from "../../../../Components/QueryWrapper/QueryViewWrapper";
import { ProductDTO } from "../../../../Types/types";

export default function Index() {
  const productsQuery = useProductsQuery();
  const navigate = useNavigate();

  return (
    <QueryViewWrapper<ProductDTO> query={productsQuery}>
      {(data) => (
        <GenericCrud2<ProductDTO & { id: string }>
          items={data}
          viewConfig={[
            { name: { label: "Име" } },
            { category: { label: "Категория" } },
            { code: { label: "Kod" } },
            { unit: { label: "Мярка" } },
            { priceDrebno: { label: "Цена на дребно?" } },
            { priceEdro: { label: "Цена на едро?" } },
            { isActive: { label: "Активен?" } },
            { keepPriceDrebno: { label: "Запази цена дребно?" } },
            { inPriceList: { label: "В ценовия лист?" } },
            { hasDiscount: { label: "Отстъпка?" } },
          ]}
          actions={{
            delete: null,
            edit: (selectedItem) =>
              navigate("./update", { state: { selectedItem } }),
            add: null,
          }}
          groupBy="category"
          displayKeys={["name"]}
        />
      )}
    </QueryViewWrapper>
  );
}
