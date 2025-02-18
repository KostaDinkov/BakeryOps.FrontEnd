
import {  Meta } from '@storybook/react';
import MaterialPriceGraph from './MaterialPriceGraph';
import { MaterialPriceHistory } from '../../Types/types';

export default {
  title: 'Components/MaterialPriceGraph',
  component: MaterialPriceGraph,
} as Meta<typeof MaterialPriceGraph>;
const samplePriceHistory: MaterialPriceHistory = {
    "materialId": "cde2253d-9e0b-4516-8266-08dcf2049f7e",
    "materialName": "Яйца",
    "priceHistory": [
        {
            "id": "0e5685a2-187a-4bf0-1238-08dd4c38c9b4",
            "price": 0.33,
            "date": "2025-01-15T22:00:00"
        },
        {
            "id": "32725964-1ae4-4345-9743-08dd4cfbbba2",
            "price": 0.50,
            "date": "2025-01-16T22:00:00"
        },
        {
            "id": "417f97c3-c555-41dc-5766-08dd4c2a4205",
            "price": 0.27,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "6c2a14b0-85ba-4fcf-5768-08dd4c2a4205",
            "price": 0.41,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "b6197a22-3e27-419a-122b-08dd4c38c9b4",
            "price": 0.36,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "c3bb9a0e-20cb-4ce2-122d-08dd4c38c9b4",
            "price": 0.52,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "bf259a4b-6c2a-4503-122f-08dd4c38c9b4",
            "price": 0.29,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "65036afa-e92f-4b48-1231-08dd4c38c9b4",
            "price": 0.54,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "0db37852-9827-4383-1233-08dd4c38c9b4",
            "price": 0.23,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "437b2c9f-6ec4-4415-1235-08dd4c38c9b4",
            "price": 0.47,
            "date": "2025-02-13T22:00:00"
        },
        {
            "id": "04fa3dbe-401f-419d-973d-08dd4cfbbba2",
            "price": 0.38,
            "date": "2025-02-14T22:00:00"
        },
        {
            "id": "cceedf6f-6e7b-4d53-973e-08dd4cfbbba2",
            "price": 0.42,
            "date": "2025-02-14T22:00:00"
        },
        {
            "id": "3bed993a-78b9-4aad-973f-08dd4cfbbba2",
            "price": 0.26,
            "date": "2025-02-14T22:00:00"
        },
        {
            "id": "5069f79d-a29b-410a-9740-08dd4cfbbba2",
            "price": 0.49,
            "date": "2025-02-14T22:00:00"
        },
        {
            "id": "70f83cf5-cd97-4bcc-9741-08dd4cfbbba2",
            "price": 0.35,
            "date": "2025-02-15T22:00:00"
        },
        {
            "id": "c71da485-31b6-41b4-9745-08dd4cfbbba2",
            "price": 0.21,
            "date": "2025-02-15T22:00:00"
        }
    ]
}

const Template = (args) => <MaterialPriceGraph {...args} />;
export const Default = Template.bind({});

Default.args = {
  priceHistory: samplePriceHistory,
};

export const Empty = Template.bind({});
Empty.args = {
  priceHistory: {
    materialId: '123',
    materialName: 'Test Material',
    priceHistory: [],
  },
};
