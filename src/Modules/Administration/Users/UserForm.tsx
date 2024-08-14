import { useForm, SubmitHandler } from "react-hook-form";
import { NewUserDTO } from "../../../Types/UserDTO";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewUserDTO>();

  const onSubmit: SubmitHandler<NewUserDTO> = (data) => {
    console.log(data);
  };
  return (
    <div>
      User Form
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name
          <input {...register("firstName",{
            required: "This is required",
            maxLength: {value: 20, message: "Max length is 20"}
          })} placeholder="First Name" />
        </label>

        <label>
          Last Name
          <input {...register("lastName")} placeholder="Last Name" />
        </label>

        <label>
          User Name
          <input {...register("userName")} placeholder="User Name" />
        </label>

        <label>
          Password
          <input {...register("password")} placeholder="Password" />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
