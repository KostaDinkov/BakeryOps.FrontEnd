import { Material, MaterialDTO } from "../Types/Material";
import { UnauthorizedError } from "../system/errors";

const hostName = import.meta.env.VITE_API_SERVER_URL;

export async function getMaterials(): Promise<Material[]> {
  let response = await fetch(`${hostName}/api/materials/getMaterials`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to get materials");
  }
  return response.json();
}

export async function getMaterialsByCategory(): Promise<{categoryName:Material[]}> {
    let materials = await getMaterials();
    let materialsByCategory = Object.groupBy(materials, (m:Material)=>m.category.name)
    return materialsByCategory;
}

export async function addMaterial(material: Material): Promise<Material> {
  let materialDTO: MaterialDTO = {
    id:"00000000-0000-0000-0000-000000000000",
    name: material.name,
    unit: material.unit,
    description: material.description,
    vendorId: material.vendor.id,
    categoryId: material.category.id,
  };

  let response = await fetch(`${hostName}/api/Materials/AddMaterial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(materialDTO),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function deleteMaterial(id: string): Promise<void> {
  let response = await fetch(`${hostName}/api/materials/deleteMaterial/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to delete material");
  }
}

export async function getMaterialById(id: string): Promise<Material> {
  let response = await fetch(`${hostName}/api/materials/getMaterial/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 401) {
    throw new UnauthorizedError("Not authorized to get material");
  }
  return response.json();
}

export async function updateMaterial(material: Material): Promise<Material> {
  let materialDTO: MaterialDTO = {
    id: material.id,
    name: material.name,
    unit: material.unit,
    description: material.description,
    vendorId: material.vendor.id,
    categoryId: material.category.id,
  };
  let response = await fetch(`${hostName}/api/materials/updateMaterial`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(materialDTO),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}
