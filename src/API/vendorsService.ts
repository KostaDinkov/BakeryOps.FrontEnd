import Vendor from "../Types/Vendor";
import { UnauthorizedError } from "../system/errors";

const hostName = import.meta.env.VITE_API_SERVER_URL;

export async function getVendors(): Promise<Vendor[]> {
  let response = await fetch(`${hostName}/api/vendors/getVendors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to get vendors");
  }
  return response.json();
}

export async function addVendor(vendor: Vendor): Promise<Vendor> {
  let response = await fetch(`${hostName}/api/vendors/addVendor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(vendor),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function deleteVendor(id: string): Promise<void> {
  let response = await fetch(`${hostName}/api/vendors/deleteVendor/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to delete vendor");
  }
}

export async function getVendorById(id: string): Promise<Vendor> {
  let response = await fetch(`${hostName}/api/vendors/getVendor/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to get vendor");
  }
  return response.json();
}

export async function updateVendor(vendor: Vendor): Promise<Vendor> {
  let response = await fetch(`${hostName}/api/vendors/updateVendor`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(vendor),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}