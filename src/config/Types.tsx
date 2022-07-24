
export interface IUserMain{
    id?: number;
}
export interface IUser extends IUserMain{
    nombre:string;
    apellido:string;
    email:string;
}