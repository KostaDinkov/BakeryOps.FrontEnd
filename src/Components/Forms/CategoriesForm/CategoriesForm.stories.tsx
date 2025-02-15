import type { Meta, StoryObj } from '@storybook/react';
import CategoriesForm from './CategoriesForm';
import { CategoryDTO } from '../../../Types/types';
import { FormDataProvider } from '../../GenericForm/FormDataProvider';
import FormWithData from '../../GenericForm/FormWithData';
import {categoryFormSchema, CategoryFormType} from './CategoriesForm'
import GenericForm from '../../GenericForm/GenericForm';

const meta: Meta<typeof CategoriesForm> = {
  title: 'Nomenclature/CategoriesForm',
  component: CategoriesForm,
};

export default meta;
type Story = StoryObj<typeof CategoriesForm>;

export const Empty: Story = {
    render: (args) => (
      <>
      <GenericForm<CategoryFormType, CategoryDTO>
            onSubmit={()=>{}}
            onCancel={()=>{}}
            defaultValues={{id:"123",name:"Test Category"}}
            zodSchema={categoryFormSchema}
            FormFields={CategoriesForm}
          />
      </>
    ),
    
  };


