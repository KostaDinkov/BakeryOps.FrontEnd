import type { Meta, StoryObj } from '@storybook/react';
import CategoriesForm from './CategoriesForm';
import { CategoryDTO } from '../../../Types/types';

const meta: Meta<typeof CategoriesForm> = {
  title: 'Nomenclature/CategoriesForm',
  component: CategoriesForm,
};

export default meta;
type Story = StoryObj<typeof CategoriesForm>;

export const Empty: Story = {
    render: (args) => <CategoriesForm {...args} />,
    args: {
      selectedItem:undefined
    },
  };

export const WithSelectedItem: Story = {
  render: (args) => <CategoriesForm {...args} />,
  args: {
    selectedItem: {
      name: 'Default Category',
      // ...other properties if needed...
    } as CategoryDTO,
  },
};

