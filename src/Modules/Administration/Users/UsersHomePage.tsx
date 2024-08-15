import {useState} from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { getUsers } from "../../../API/usersService";
import UserDTO from "../../../Types/UserDTO";
import { Button } from "@mui/material";
import {deleteUser} from "../../../API/usersService";

export async function usersLoader() {
  let users = await getUsers();
  return users;
}
export default function UsersHomePage() {

    const [users, setUsers] = useState<UserDTO[]>(useLoaderData() as UserDTO[]);

    const handleDeleteUser = async (id: string) => {
      console.log("delete user with id", id);
      setUsers(users.filter((user) => user.id !== id));
      await deleteUser(id);
    }
    return (
    <div>
      <h1>Потребители</h1>
      <Link to="/admin/users/add"><Button variant="contained" color="primary">Добави потребител</Button></Link>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                <p>{user.firstName} {user.lastName} - {user.userName} 
                    <Link to={`/admin/users/edit/${user.id}`} >
                        <Button>Редактирай</Button>
                    </Link>
                    <Button onClick={()=>handleDeleteUser(user.id)}>Изтрий</Button>
                </p>

            </li>
            ))}
        </ul>
    </div>
  );
}
