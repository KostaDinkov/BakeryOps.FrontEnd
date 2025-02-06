import type { Meta, StoryObj } from "@storybook/react";
import ItemDetails from "./GenericItemView";
import { sampleProducts } from "../../tests/sampleData/sampleProducts"; // adjust sample data accordingly
import { sampleDeliveries } from "../../tests/sampleData/sampleDeliveries";
import { DeliveryDTO, ProductDTO } from "../../Types/types";
import { ViewConfigItem } from "./GenericItemView";
import { dateToString } from "../../system/utils";

const meta: Meta<typeof ItemDetails> = {
  component: ItemDetails,
};
export default meta;
type Story = StoryObj<typeof ItemDetails>;

const viewConfig: ViewConfigItem<ProductDTO>[] = [
  { name: {label:"Име"} },
  { category: {label:"Категориря"} },
  { priceDrebno: {label:"Цена на дрербно"} },
  { priceEdro: {label:"Цена на едро"}},
  { isActive: {label:"Активен"} },
];

export const ProductDto: Story = {
  render: (args) => (
    <ItemDetails<ProductDTO> item={sampleProducts[0]} viewConfig={viewConfig} />
  ),
};

const deliveryVeiwConfig: ViewConfigItem<DeliveryDTO>[] = [
  { vendorName: {label:"Доставчик"}},
  { deliveryDate: {label:"Дата на доставка"} },
  { invoiceNumber: {label:"Фактура №"} },
  { totalWithTax: {label:"Общо с ДДС"} },
  { notes: {label:"Бележки"} },
  {items:{label:"Сотоки", columnDef:
    [
        {
          field: "materialName",
          headerName: "Стока",
          headerClassName: "bg-white",
          description: "Име на стоката",
        },
        {
          field: "quantity",
          headerName: "Кол.",
          description: "Количество на стоката",
          headerClassName: "bg-white",
        },
        {
          field: "materialUnit",
          headerName: "Мярка",
          description: "Мярка на стоката",
          headerClassName: "bg-white",
        },
        {
          field: "unitPrice",
          headerName: "Ед.цена",
          description: "Цена на стоката",
          headerClassName: "bg-white",
        },
        {
          field: "totalPrice",
          headerName: "Цена",
          description: "Обща цена за стоката",
          headerClassName: "bg-white",
          valueGetter: (value, row) => row.quantity * row.unitPrice,
        },
        {
          field: "lotNumber",
          headerName: "Партида",
          description: "Партиден номер",
          headerClassName: "bg-white",
        },
        {
          field: "expirationDate",
          headerName: "Годност",
          description: "Срок на годност",
          headerClassName: "bg-white",
          valueFormatter: (value) => dateToString(value),
        },
        {
          field: "notes",
          headerName: "Бележка",
          description: "Бележка",
          headerClassName: "bg-white",
        },
      ]
  }}
  
];
export const DeliveryDto: Story = {
  render: (args) => (
    <ItemDetails<ProductDTO>
      item={sampleDeliveries[0]}
      viewConfig={deliveryVeiwConfig}
    />
  ),
};
