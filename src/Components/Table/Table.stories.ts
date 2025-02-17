import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";
import "../../index.css";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      { field: "name", label: "Име" },
      { field: "description", label: "Описание" },
      { field: "age", label: "Възраст" },
      { field: "homeTown", label: "Град" },
      { field: "occupation", label: "Професия" },
      { field: "phoneNumber", label: "Телефон" },
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
