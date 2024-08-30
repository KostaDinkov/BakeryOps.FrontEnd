
export default interface UserDTO {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  permissions: string[];
}

export interface NewUserDTO extends UserDTO {
 
  password: string,
  
}