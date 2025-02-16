import type { Meta, StoryObj } from '@storybook/react';
import ClientFormFields, { clientSchema, ClientFormType } from './ClientsForm';
import GenericForm from '../../GenericForm/GenericForm';
import { ClientDTO } from '../../../Types/types';
import "../../../styles/vars.css"

const meta: Meta<typeof ClientFormFields> = {
  title: 'Forms/ClientsForm',
  component: ClientFormFields,
};

export default meta;
type Story = StoryObj<typeof ClientFormFields>;

const sampleClient:ClientDTO = {
  name: 'John Doe',
  phone: '123456789',
  email: 'john@example.com',
  isCompany: true,
  isSpecialPrice: false,
  hasDiscount: true,
};

export const Empty: Story = {
  render: () => (
    <GenericForm<ClientFormType, typeof sampleClient>
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValues={undefined}
      zodSchema={clientSchema}
      FormFields={ClientFormFields}
      data={{}}
    />
  ),
};

export const WithData: Story = {
  render: () => (
    <GenericForm<ClientFormType, typeof sampleClient>
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValues={sampleClient}
      zodSchema={clientSchema}
      FormFields={ClientFormFields}
      data={{}}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <GenericForm<ClientFormType, typeof sampleClient>
      onSubmit={() => { throw new Error('Sample error'); }}
      onCancel={() => {}}
      defaultValues={{ name: '', isCompany: false, isSpecialPrice: false, hasDiscount: false }}
      zodSchema={clientSchema}
      FormFields={ClientFormFields}
      data={{}}
    />
  ),
};
