import type { Meta, StoryObj } from "@storybook/react";

import Table from "../Components/Table/Table";
import "../index.css";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      { target: "name", label: "Име" },
      { target: "description", label: "Описание" },
      { target: "age", label: "Възраст" },
      { target: "homeTown", label: "Град" },
      { target: "occupation", label: "Професия" },
      { target: "phoneNumber", label: "Телефон" },
    ],
    data: [
      {
        name: "Kosta",
        description: "Some description",
        age: "25",
        homeTown: "Sofia",
        occupation: "Developer",
        phoneNumber: "0888888888",
      },
      {
        name: "Pesho",
        description: "Some description",
        age: "25",
        homeTown: "Sofia",
        occupation: "Developer",
        phoneNumber: "0888888888",
      },
      {
        name: "Gosho",
        description: "Some description",
        age: "25",
        homeTown: "Sofia",
        occupation: "Developer",
        phoneNumber: "0888888888",
      },
    ],
  },
};
