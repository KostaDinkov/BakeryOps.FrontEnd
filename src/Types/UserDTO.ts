
export default interface UserDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  permissions: string[];
}

export interface NewUserDTO extends Omit<UserDTO, 'id'|'permissions'> {
 
  password: string,
}