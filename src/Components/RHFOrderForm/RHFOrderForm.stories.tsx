import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "@storybook/blocks";
import RHFOrderForm from "./RHFOrderForm";
import { sampleProducts } from "../../tests/sampleData/sampleProducts";
import { sampleClients } from "../../tests/sampleData/sampleClients";
import { OrderDTO } from "../../Types/types";

const meta: Meta<typeof RHFOrderForm> = {
  component: RHFOrderForm,
};
export default meta;
type Story = StoryObj<typeof RHFOrderForm>;

export const CreateMode: Story = {
  render: () => (
    <RHFOrderForm products={sampleProducts} clients={sampleClients} />
  ),
};

const sampleOrder: OrderDTO = {
  clientId: "Жоро - Костенец",
  clientPhone: "0888123456",
  pickupDate: "2025-01-28T09:00:00.000Z",
  isPaid: true,
  advancePaiment: 50,
  orderItems: [
    {
      productId: "f0d5a20c-fce3-fb44-87cf-003f3cb21aa5",
      productAmount: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sunt ex velit cumque aliquam atque repellendus maxime tempore assumenda exercitationem!",
      cakeFoto: "c1583",
      cakeTitle: "ЧРД",
      isInProgress: false,
      isComplete: false,
      itemUnitPrice: 18.33,
    },
    {
      productId: "30d65733-3947-214f-82f6-030312eb00ac",
      productAmount: 1,
      cakeFoto: "",
      cakeTitle: "",
    },
    {
      productId: "e035a9bc-6de8-9441-9067-04e647a2e62a",
      productAmount: 3,
      description: "Вкусно черничко Наоми",
    },
  ],
};

export const UpdateMode: Story = {
  render: () => (
    <RHFOrderForm
      products={sampleProducts}
      clients={sampleClients}
      order={sampleOrder}
    />
  ),
};
