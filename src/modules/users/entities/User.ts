export type UserRole =
  | "ADMIN"
  | "TECHNICIAN"
  | "REQUESTER";

export class User {
  id!: string;

  name!: string;
  email!: string;
  password!: string;

  role!: UserRole;

  isActive!: boolean;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(props: User) {
    Object.assign(this, props);
  }
}