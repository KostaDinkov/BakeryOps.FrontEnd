import type { Meta, StoryObj } from '@storybook/react';
import MaterialFormFields, { materialFormSchema, MaterialFormType } from './MaterialsFormFields';
import GenericForm from '../../GenericForm/GenericForm';
import { MaterialDTO } from '../../../Types/types';


const meta: Meta<typeof MaterialFormFields> = {
  title: 'Forms/MaterialsForm',
  component: MaterialFormFields,
};

export default meta;
type Story = StoryObj<typeof MaterialFormFields>;

const sampleMaterial:MaterialDTO = {
  id: '1',
  unitId: '1',
  vendorId: '1',
  categoryId: '1',
  name: 'Sample Material',
  categoryName: 'Sample Category',
  description: 'A sample description',
  unitName: 'kg',
  vendorName: 'Sample Vendor',
  latestPrice: 10.0,
};

const sampleData = {
  categories: [{ id: '1', name: 'Sample Category' }],
  vendors: [{ id: '1', name: 'Sample Vendor' }],
  units: [{ id: '1', name: 'kg' }],
};

export const Empty: Story = {
  render: () => (
    <GenericForm<MaterialFormType, typeof sampleMaterial>
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValues={undefined}
      zodSchema={materialFormSchema}
      FormFields={MaterialFormFields}
      data={sampleData}
    />
  ),
};

export const WithData: Story = {
  render: () => (
    <GenericForm<MaterialFormType, typeof sampleMaterial>
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValues={sampleMaterial}
      zodSchema={materialFormSchema}
      FormFields={MaterialFormFields}
      data={sampleData}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <GenericForm<MaterialFormType, typeof sampleMaterial>
      onSubmit={() => { throw new Error('Sample error'); }}
      onCancel={() => {}}
      defaultValues={{ ...sampleMaterial, name: '', unitName: '' }}
      zodSchema={materialFormSchema}
      FormFields={MaterialFormFields}
      data={sampleData}
    />
  ),
};
