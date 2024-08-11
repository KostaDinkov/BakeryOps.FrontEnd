import UserDTO from "../Types/UserDTO";
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