import UserDTO, { NewUserDTO } from "../Types/UserDTO";
import { UnauthorizedError } from "../system/errors"

const hostName = import.meta.env.VITE_API_SERVER_URL;

export async function getUsers(): Promise<UserDTO[]>{
    let response = await fetch(
      `${hostName}/api/users/getUsers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to get users");
    }
    return response.json();
}

export async function addUser(user:NewUserDTO): Promise<UserDTO>{
    let response = await fetch(
      `${hostName}/api/users/addUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(user)
      }
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    
    return response.json();
}

export async function deleteUser(id:string): Promise<void>{
    let response = await fetch(
      `${hostName}/api/users/deleteUser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to delete user");
    }
    
}

export async function getUserById(id:string): Promise<UserDTO>{
    let response = await fetch(
      `${hostName}/api/users/getUserById/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to get user");
    }
    return response.json();
}

export async function updateUser(user:UserDTO): Promise<UserDTO>{
    let response = await fetch(
      `${hostName}/api/users/updateUser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(user)
      }
    );
    if (response.status === 401) {
      throw new UnauthorizedError("Not authorized to edit user");
    }
    return response.json();
} 