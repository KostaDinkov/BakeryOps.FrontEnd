import type {Meta, StoryObj} from '@storybook/react';
import GenericCrud2 from './GenericCrud2';
import ItemForm from './ItemForm';
import {sampleProducts} from '../../tests/sampleData/sampleProducts';
import { sampleClients } from '../../tests/sampleData/sampleClients';
import { sampleMaterials } from '../../tests/sampleData/sampleMaterials';
import { sampleDeliveries } from '../../tests/sampleData/sampleDeliveries';

const meta: Meta<typeof GenericCrud2> = {
    component: GenericCrud2,
}
export default meta;
type Story = StoryObj<typeof GenericCrud2>;

export const Products: Story = {
    args: {
        groupBy:"category",
        items: sampleProducts,
        children: <ItemForm />, // Added ItemForm as child
    },
};
export const Clients: Story = {
    args: {
        items: sampleClients,
        children: <ItemForm />, // Added ItemForm as child
    },
};
export const Materials: Story = {
    args: {
        groupBy:"categoryName",
        items: sampleMaterials,
        children: <ItemForm />, // Added ItemForm as child
    },
};
