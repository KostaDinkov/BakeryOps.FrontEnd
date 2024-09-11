import Category from "../Types/Category";
import { UnauthorizedError } from "../system/errors";

const hostName = import.meta.env.VITE_API_SERVER_URL;

export async function getCategories(): Promise<Category[]>{ 
    let response = await fetch(
      `${hostName}/api/categories/getCategories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to get categories");
    }
    return response.json();
}

export async function addCategory(category:Category): Promise<Category>{
    let response = await fetch(
      `${hostName}/api/categories/addCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(category)
      }
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    
    return response.json();
}

export async function deleteCategory(id:string): Promise<void>{
    let response = await fetch(
      `${hostName}/api/categories/deleteCategory/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to delete category");
    }
}

export async function getCategoryById(id:string): Promise<Category>{
    let response = await fetch(
      `${hostName}/api/categories/getCategory/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to get category");
    }
    return response.json();
}

export async function updateCategory(category:Category): Promise<Category>{
    let response = await fetch(
      `${hostName}/api/categories/updateCategory`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(category)
      }
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    
    return response.json();
}

