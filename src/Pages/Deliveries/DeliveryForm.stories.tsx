import type {Meta, StoryObj} from '@storybook/react';
import DeliveryForm from './DeliveryForm';
import { sampleMaterials } from '../../tests/sampleData/sampleMaterials';
import { sampleVendors } from '../../tests/sampleData/sampleVendors';
import { sampleDeliveries } from '../../tests/sampleData/sampleDeliveries';
import { Button } from '@mui/material';
import { Story } from '@storybook/blocks';


const meta: Meta<typeof DeliveryForm> = {
    component: DeliveryForm,
    
}
export default meta;
type Story = StoryObj<typeof DeliveryForm>;


const sampleHandleSave = (data: any) => {
    console.log('Save data:', data);
};

const sampleButtons = ()=>{
    return (
        <div>
            <Button onClick={()=>console.log('Save clicked')}>Save</Button>
            <Button onClick={()=>console.log('Cancel clicked')}>Cancel</Button>
        </div>
    )
    
};

export const Default: Story = {
    args: {
        selectedItem: sampleDeliveries[0],
        queryData: {materials:sampleMaterials, vendors:sampleVendors},
        handleSave: sampleHandleSave,
        Buttons: sampleButtons,
    },
};

export const Empty: Story = {
    args: {
        ...Default.args,
        selectedItem: null,
    },
};
