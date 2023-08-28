export type Role = 'admin' | 'user';

export default interface IUser {
  _id: string;
  name: string;
  password: string;
  image: string;
  email: string;
  role: Role;
}

export interface UserDTO {
  name: string;
  password: string;
  image: string;
  email: string;
  role: Role;
}
