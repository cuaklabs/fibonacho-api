import { UserApiV1Address } from "./UserApiV1Address";


export interface UserApiV1UpdateQuery {
  address?: UserApiV1Address | null;
  id: string;
  name?: string;
  surname?: string | null;
}
