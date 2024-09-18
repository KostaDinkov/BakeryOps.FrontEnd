import React from "react";
import Vendor from "../../../Types/Vendor";
import { Button, TextField } from "@mui/material";
import styles from "../Materials/MaterialForm.module.scss";

export default function VendorForm({
  selectedVendor,
  onSubmit,
}: {
  selectedVendor: Vendor;
  onSubmit: (formData: Vendor, mode: "create" | "update") => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let vendor = {} as Vendor;
    vendor.name = formData.get("name") as string;
    vendor.address = formData.get("address") as string;
    vendor.phoneNumber = formData.get("phoneNumber") as string;
    vendor.email = formData.get("email") as string;
    vendor.description = formData.get("description") as string;
    if (selectedVendor.id === "") {
      onSubmit(vendor, "create");
    } else {
      vendor.id = selectedVendor.id;
      onSubmit(vendor, "update");
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.materialForm}>
      <TextField
        label="Име"
        id="name"
        name="name"
        defaultValue={selectedVendor.name}
      />
      <TextField
        label="Адрес"
        id="address"
        name="address"
        defaultValue={selectedVendor.address}
      />
      <TextField
        label="Телефон"
        id="phoneNumber"
        name="phoneNumber"
        defaultValue={selectedVendor.phoneNumber}
      />
      <TextField
        label="Ел. Поща"
        id="email"
        name="email"
        defaultValue={selectedVendor.email}
      />
      <TextField
        label="Описание"
        id="description"
        name="description"
        defaultValue={selectedVendor.description}
      />
      <Button type="submit" variant="contained" color="primary">
        Запази
      </Button>
    </form>
  );
}
