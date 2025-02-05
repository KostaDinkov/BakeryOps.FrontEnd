import type { Meta, StoryObj } from '@storybook/react';
import GenericItemList from './GenericItemList';

import { sampleProducts } from '../../tests/sampleData/sampleProducts';
import { sampleClients } from '../../tests/sampleData/sampleClients';
import { sampleMaterials } from '../../tests/sampleData/sampleMaterials';
import { sampleDeliveries } from '../../tests/sampleData/sampleDeliveries';
import { DeliveryDTO, MaterialDTO } from '../../Types/types';

const meta: Meta<typeof GenericItemList> = {
    component: GenericItemList,
};
export default meta;
type Story = StoryObj<typeof GenericItemList>;

export const Products: Story = {
    render: (args) => <GenericItemList {...args} />,
    args: {
        groupBy: "category",
        items: sampleProducts,
        displayKeys: ["name"],
    },
};

export const Clients: Story = {
    render: (args) => <GenericItemList<ClientDTO> items={sampleClients} displayKeys={["name"]} />,
    
};

export const Materials: Story = {
    render: (args) => <GenericItemList<MaterialDTO> groupBy= "categoryName" items={sampleMaterials} displayKeys={["name"]}/>,

};

export const Deliveries: Story = {
    render: (args) => <GenericItemList<DeliveryDTO> items={sampleDeliveries} displayKeys= {["vendorName","totalWithTax"]} />,
    
};