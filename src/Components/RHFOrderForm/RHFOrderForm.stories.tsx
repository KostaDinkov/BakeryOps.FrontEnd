import type {Meta, StoryObj} from '@storybook/react';
import { Story } from '@storybook/blocks';
import RHFOrderForm from './RHFOrderForm';
import { sampleProducts } from '../../tests/sampleData/sampleProducts';
import {sampleClients} from '../../tests/sampleData/sampleClients';

const meta: Meta<typeof RHFOrderForm> = {
    component: RHFOrderForm,
    
}
export default meta;
type Story = StoryObj<typeof RHFOrderForm>;


export const Default: Story = {
    render: () => <RHFOrderForm products={sampleProducts} clients ={sampleClients}/>,
};


