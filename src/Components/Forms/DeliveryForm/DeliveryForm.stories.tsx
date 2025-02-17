import type { Meta, StoryObj } from '@storybook/react';
import DeliveryForm from './DeliveryForm';
import { sampleDeliveries } from '../../../tests/sampleData/sampleDeliveries';
import { DeliveryDTO } from '../../../Types/types';
import { deliverySchema, DeliveryFormType } from './deliverySchema';
import GenericForm from '../../GenericForm/GenericForm';
import { sampleVendors } from '../../../tests/sampleData/sampleVendors';
import { sampleMaterials } from '../../../tests/sampleData/sampleMaterials';

const meta: Meta<typeof DeliveryForm> = {
  title: 'Forms/DeliveryForm',
  component: DeliveryForm,
};

export default meta;
type Story = StoryObj<typeof DeliveryForm>;

const emptyDelivery: DeliveryDTO = {
  vendorId: '',
  deliveryDate: new Date().toISOString(),
  invoiceNumber: null,
  items: [{
    materialId: '',
    quantity: 1,
    unitPrice: 0,
  }]
};

export const Empty: Story = {
  render: () => (
    <GenericForm<DeliveryFormType, DeliveryDTO>
      onSubmit={() => { } }
      onCancel={() => { } }
      defaultValues={undefined}
      zodSchema={deliverySchema}
      FormFields={DeliveryForm} 
      data={{materials:sampleMaterials, vendors:sampleVendors}}    />
  )
};

export const WithData: Story = {
  render: () => (
    <GenericForm<DeliveryFormType, DeliveryDTO>
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValues={sampleDeliveries[0]}
      zodSchema={deliverySchema}
      FormFields={DeliveryForm}
      data={{materials:sampleMaterials, vendors:sampleVendors}}
    />
  )
};

export const WithError: Story = {
  render: () => (
    <GenericForm<DeliveryFormType, DeliveryDTO>
      onSubmit={() => { throw new Error('Sample error'); }}
      onCancel={() => {}}
      defaultValues={emptyDelivery}
      zodSchema={deliverySchema}
      FormFields={DeliveryForm}
      data={{materials:sampleMaterials, vendors:sampleVendors}}
    />
  )
};


