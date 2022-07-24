import { IUser } from "../../config/Types";
import API from "../API";
export const getClient = async () => {
  return API.get(``);
};
export const postClient = async ({ nombre, apellido, email }: IUser) => {
  return API.post(``, {
    nombre,
    apellido,
    email,
  });
};
export const updateClient = async ({ nombre, apellido, email, id }: IUser) => {
  return API.put(`${id}`, {
    nombre,
    apellido,
    email
  })
  
};
export const deleteClient = async (id:any) => {
  return API.delete(`${id}`);
};
