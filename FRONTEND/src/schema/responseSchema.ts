import { userSchema } from "./schema";

export interface GenericResponse {
  status: number;
  message: string;
  token: string;
}
