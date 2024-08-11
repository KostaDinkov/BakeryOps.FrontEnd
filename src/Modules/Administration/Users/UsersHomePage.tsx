
import { useLoaderData, useParams } from "react-router-dom";
import { getUsers } from "../../../API/usersService";
import UserDTO from "../../../Types/UserDTO";

export async function usersLoader() {
  let users = await getUsers();
  return users;
}
export default function UsersHomePage() {

    let users = useLoaderData() as UserDTO[] ;
    
    
  return (
    <div>
      <h1>Потребители</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                <p>{user.userName} - {user.firstName} {user.lastName} <br/>
                Права: {user.permissions.join(", ")}
                </p>

            </li>
            ))}
        </ul>
    </div>
  );
}
