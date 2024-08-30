import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { getUsers } from "../../../API/usersService";
import UserDTO from "../../../Types/UserDTO";
import { Button } from "@mui/material";
import { deleteUser } from "../../../API/usersService";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";
export async function usersLoader() {
  let users = await getUsers();
  return users;
}
export default function UsersHomePage() {
  const [users, setUsers] = useState<UserDTO[]>(useLoaderData() as UserDTO[]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const handleDeleteUser = async (id: string | null) => {
    if (!id) return;
    console.log("delete user with id", id);
    setUsers(users.filter((user) => user.id !== id));
    await deleteUser(id);
  };

  const confirmDelete = (id: string | null) => {
    setDeleteUserId(id);
    setIsDialogOpen(true);
  }

  return (
    <div>
      <ConfirmationDialog
        title="Изтриване на потребител"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        promptText="Сигурни ли сте, че искате да изтриете потребителя?"
        agreeBtnText="Да"
        disagreeBtnText="Не"
        handleAgree={() => {
          handleDeleteUser(deleteUserId)
          setIsDialogOpen(false);
          return true;
        }}
      />
      <h1>Потребители</h1>
      <Link to="/admin/users/add">
        <Button variant="contained" color="primary">
          Добави потребител
        </Button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>
              {user.firstName} {user.lastName} - {user.userName}
              <Link to={`/admin/users/edit/${user.id}`} state={{ user: user }}>
                <Button>Редактирай</Button>
              </Link>
              <Button onClick={() => confirmDelete(user.id)}>Изтрий</Button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
