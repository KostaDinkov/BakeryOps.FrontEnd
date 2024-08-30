import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserDTO } from "../../../Types/UserDTO";
import { addUser, updateUser } from "../../../API/usersService";
import { useLocation, useNavigate } from "react-router-dom";
import { getPermissions } from "../../../API/authenticationService";
import { Button, Checkbox } from "@mui/material";
import styles from "./UserForm.module.scss";

export default function UserForm() {
  const user = useLocation().state?.user as NewUserDTO;

  let isEdit = !!user;

  const { register, handleSubmit } = useForm<NewUserDTO>();

  const navigate = useNavigate();
  const [allPermissions, setAllPermissions] = useState<string[]>([]);
  let [checkedPermissions, setCheckedPermissions] = useState<boolean[]>([]);

  //Fetch all available permissions from the server
  useEffect(() => {
    const fetchAllPermissions = async () => {
      const response = await getPermissions();
      setAllPermissions(response);
    };
    fetchAllPermissions();
  }, []);

  //If editing a user, set the permissions checkboxes to the user's permissions
  useEffect(() => {
    let userPermissions = new Array(allPermissions.length).fill(false);

    if (isEdit) {
      allPermissions.forEach((permission, index) => {
        if (user?.permissions.includes(permission)) {
          userPermissions[index] = true;
        }
      });
      setCheckedPermissions(userPermissions);
    }
  }, [allPermissions]);

  const onSubmit: SubmitHandler<NewUserDTO> = async (data) => {
    const newUser: NewUserDTO = {
      id: null,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,

      permissions: allPermissions.filter(
        (_, index) => checkedPermissions[index]
      ),
    };

    try {
      if (isEdit) {
        newUser.id = user.id;
        const response = await updateUser(newUser);
        navigate("/admin/users");
      } else {
        const response = await addUser(newUser);
        navigate("/admin/users");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>
        {isEdit ? "Редактиране на потребител" : "Добавяне на нов потребител"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
        <label className={styles.label} htmlFor="firstName">
          Име
        </label>
        <input
          className={styles.input}
          id="firstName"
          {...register("firstName", {
            required: "This is required",
            maxLength: { value: 20, message: "Max length is 20" },
          })}
          placeholder="Име"
          defaultValue={user?.firstName || ""}
        />

        <label className={styles.label} htmlFor="lastName">
          Фамилия
        </label>
        <input
          className={styles.input}
          id="lastName"
          {...register("lastName")}
          placeholder="Фамилия"
          defaultValue={user?.lastName || ""}
        />

        <label className={styles.label} htmlFor="userName">
          Потребителско име
        </label>
        <input
          className={styles.input}
          id="userName"
          {...register("userName")}
          placeholder="Потребителско име"
          defaultValue={user?.userName || ""}
          required
        />

        <label className={styles.label} htmlFor="password">
          Парола
        </label>
        <input
          className={styles.input}
          id="password"
          type="password"
          {...register("password")}
          placeholder="Парола"
          required={!isEdit}
        />
        <label className={styles.label}>Права</label>
        <div className={styles.wide}>
          {allPermissions.map((permission, index) => (
            <span key={permission}>
              <Checkbox
                id={permission}
                checked={!!checkedPermissions[index]}
                value={permission}
                defaultValue={""}
                onChange={(e) => {
                  let newCheckedPermissions = [...checkedPermissions];
                  newCheckedPermissions[index] = e.target.checked;
                  setCheckedPermissions(newCheckedPermissions);
                }}
              />
              <label htmlFor={permission}> {permission}</label>
            </span>
          ))}
        </div>
        <Button variant="outlined" onClick={() => navigate("/admin/users")}>
          Откажи
        </Button>
        <Button variant="contained" type="submit">
          {" "}
          Запази
        </Button>
      </form>
    </div>
  );
}
