import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserDTO } from "../../../Types/UserDTO";
import { addUser } from "../../../API/usersService";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<NewUserDTO>();

  const navigate = useNavigate();
  
  const onSubmit: SubmitHandler<NewUserDTO> = async (data) => {
    console.log(data);
    data.permissions = [];
    const response  = await addUser(data);
    navigate("/admin/users");
    

  };
  return (
    <div >
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
          />
        </label>

        <label>
          Фамилия
          <input {...register("lastName")} placeholder="Фамилия" />
        </label>

        <label>
          Потребителско име
          <input {...register("userName")} placeholder="Потребителско име" />
        </label>

        <label>
          Парола
          <input
            type="password"
            {...register("password")}
            placeholder="Парола"
          />
        </label>
        <label>
          Парола (потвърди)
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Потвърди Парола"
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
