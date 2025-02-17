import type {Meta, StoryObj} from '@storybook/react';
import PrintOrderView from './PrintOrderView';
import { Story } from '@storybook/blocks';
import {sampleOrder} from '../../tests/sampleData/sampleOrder';
import { sampleMaterials } from '../../tests/sampleData/sampleMaterials';


const meta: Meta<typeof PrintOrderView> = {
    component: PrintOrderView,
    
}
export default meta;
type Story = StoryObj<typeof PrintOrderView>;

export const Default: Story = {
    args: {
        order: sampleOrder,
    },
};

export const AdvancedPayment: Story = {
    args: {
        order: {
            ...sampleOrder,
            advancePaiment: 10,
        },
    },
}

export const PaidOrder: Story = {
    args: {
        order: {
            ...sampleOrder,
            isPaid: true,
        },
    },
}