import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray, get } from "react-hook-form";
import UserDTO, { NewUserDTO } from "../../../Types/UserDTO";
import { addUser, getUserById, updateUser } from "../../../API/usersService";
import { useLocation, useNavigate } from "react-router-dom";
import { getPermissions } from "../../../API/authenticationService";
import { Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";
import { set } from "date-fns";

export default function UserForm() {
  const user = useLocation().state?.user as NewUserDTO;

  let isEdit = !!user;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUserDTO>();

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
        (permission, index) => checkedPermissions[index]
      ),
    };
    console.log(newUser);
    try{
      if(isEdit){
        newUser.id = user.id;
        const response = await updateUser(newUser);
        navigate("/admin/users");
      }
      else{
        const response = await addUser(newUser);
        navigate("/admin/users");
      }
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div>
      User Form
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Име
          <input
            {...register("firstName", {
              required: "This is required",
              maxLength: { value: 20, message: "Max length is 20" },
            })}
            placeholder="Име"
            defaultValue={user?.firstName || ""}
          />
        </label>

        <label>
          Фамилия
          <input
            {...register("lastName")}
            placeholder="Фамилия"
            defaultValue={user?.lastName || ""}
          />
        </label>

        <label>
          Потребителско име
          <input
            {...register("userName")}
            placeholder="Потребителско име"
            defaultValue={user?.userName || ""}
            required
          />
        </label>

        <label>
          Парола
          <input
            type="password"
            {...register("password")}
            placeholder="Парола"
            required = {!isEdit}
          />
        </label>

        <label>
          Права
          {/* TODO fix permissions */}
          {allPermissions.map((permission, index) => (
            <label key={permission}>
              {" "}
              {permission}
              <Checkbox
                checked={!!checkedPermissions[index]}
                value={permission}
                defaultValue={""}
                onChange={(e) => {
                  let newCheckedPermissions = [...checkedPermissions];
                  newCheckedPermissions[index] = e.target.checked;
                  setCheckedPermissions(newCheckedPermissions);
                }}
              />
            </label>
          ))}
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
