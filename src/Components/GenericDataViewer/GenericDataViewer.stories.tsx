import type { Meta, StoryObj } from "@storybook/react";
import GenericDataViewer from "./GenericDataViewer";
import { sampleProducts } from "../../tests/sampleData/sampleProducts";
import { sampleClients } from "../../tests/sampleData/sampleClients";
import { sampleMaterials } from "../../tests/sampleData/sampleMaterials";
import { sampleDeliveries } from "../../tests/sampleData/sampleDeliveries";
import { ClientDTO, DeliveryDTO, MaterialDTO, ProductDTO } from "../../Types/types";
import { dateToString } from "../../system/utils";

const meta: Meta<typeof GenericDataViewer> = {
  component: GenericDataViewer,
};
export default meta;
type Story = StoryObj<typeof GenericDataViewer>;

export const Products: Story = {
  render: (args) => (
    <GenericDataViewer<ProductDTO>
      items={sampleProducts}
      groupBy="category"
      viewConfig={[
        { name: { label: "Име" } },
        { category: { label: "Категория" } },
        { priceDrebno: { label: "Цена на дребно" } },
        { priceEdro: { label: "Цена на едро" } },
        { isActive: { label: "Активен" } },
      ]}
      displayKeys={["name"]}
      actions={{add:null, edit:(item)=>console.log(item), delete:null}}
    />
  ),
};
export const Clients: Story = {
  render: (args) => (
    <GenericDataViewer<ClientDTO>
      items={sampleClients}
      viewConfig={[
        { name: { label: "Име" }}, 
        {isCompany: { label: "Компания" } },
      ]}
      displayKeys={["name"]}
    />
  ),
};
export const Materials: Story = {
  render: (args) => (
    <GenericDataViewer<MaterialDTO>
      items={sampleMaterials}
      groupBy={"categoryName"}
      viewConfig={[
        { name: { label: "Име" } },
        { categoryName: { label: "Категория" } },
        { unitName: { label: "Мярка" } },
        { latestPrice: { label: "Цена" } },
      ]}
      displayKeys={["name"]}
    />
  ),
};

export const Deliveries: Story = {
  render: (args) => (
    <GenericDataViewer<DeliveryDTO>
      items={sampleDeliveries}
      viewConfig={[
        { vendorName: { label: "Доставчик" } },
        { deliveryDate: { label: "От дата", valueFormatter:(value)=>value } },
        { totalWithTax: { label: "Стойност" } },
        { invoiceNumber: { label: "Фактура №" } },
        { items:{ label: "Стоки", columnDef:[
          { field: "materialName", headerName: "Стока", headerClassName: "bg-white", description: "Име на стоката" },
          { field: "quantity", headerName: "Кол.", description: "Количество на стоката", headerClassName: "bg-white" },
          { field: "materialUnit", headerName: "Мярка", description: "Мярка на стоката", headerClassName: "bg-white" },
          { field: "unitPrice", headerName: "Ед.цена", description: "Цена на стоката", headerClassName: "bg-white" },
          { field: "totalPrice", headerName: "Цена", description: "Обща цена за стоката", headerClassName: "bg-white", valueGetter: (value, row) => row.quantity * row.unitPrice },
          { field: "lotNumber", headerName: "Партида", description: "Партиден номер", headerClassName: "bg-white" },
          { field: "expirationDate", headerName: "Годност", description: "Срок на годност", headerClassName: "bg-white", valueFormatter: (value) => dateToString(value) },
          { field: "notes", headerName: "Бележка", description: "Бележка", headerClassName: "bg-white" },
        ]}},

      ]}

      displayKeys={["vendorName", "totalWithTax"]}
    />
  ),
};
