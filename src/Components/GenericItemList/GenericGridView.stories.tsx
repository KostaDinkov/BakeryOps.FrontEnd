import type { Meta, StoryObj } from '@storybook/react';
import { GridColDef } from '@mui/x-data-grid-premium';
import GenericGridView from './GenericGridView';
import { sampleDeliveries } from '../../tests/sampleData/sampleDeliveries';
import { dateToString } from '../../system/utils';
import { DeliveryItemDTO } from '../../Types/types';

const meta: Meta<typeof GenericGridView<DeliveryItemDTO>> = {
  component: GenericGridView,
};
export default meta;
type Story = StoryObj<typeof GenericGridView<DeliveryItemDTO>>;

const columns: GridColDef[] = [
    {
      field: "materialName",
      headerName: "Стока",
      headerClassName: "bg-white",
      description: "Име на стоката",
    },
    {
      field: "quantity",
      headerName: "Кол.",
      description: "Количество на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "materialUnit",
      headerName: "Мярка",
      description: "Мярка на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "unitPrice",
      headerName: "Ед.цена",
      description: "Цена на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "totalPrice",
      headerName: "Цена",
      description: "Обща цена за стоката",
      headerClassName: "bg-white",
      valueGetter: (value, row) => row.quantity * row.unitPrice,
    },
    {
      field: "lotNumber",
      headerName: "Партида",
      description: "Партиден номер",
      headerClassName: "bg-white",
    },
    {
      field: "expirationDate",
      headerName: "Годност",
      description: "Срок на годност",
      headerClassName: "bg-white",
      valueFormatter: (value) => dateToString(value),
    },
    {
      field: "notes",
      headerName: "Бележка",
      description: "Бележка",
      headerClassName: "bg-white",
    },
  ];
if (!columns) throw new Error("Columns are required");
if(!sampleDeliveries[0]) throw new Error("Sample data is required");
if(!sampleDeliveries[0].items) throw new Error("Items are required");

export const Default: Story = {
  render: () => <GenericGridView<DeliveryItemDTO> items={sampleDeliveries[0].items} columnsDef={columns} />,
    
};
