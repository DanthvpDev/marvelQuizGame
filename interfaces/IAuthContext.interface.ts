import { IUser } from "@/types/User.type";

export interface IAuthContext {
    authState: States;
    isChecking: boolean;
    isAuthenticated: boolean;
    error: string|null;
    user?: IUser;
    login: (email:string, password:string)=> Promise<boolean>;
    logout: ()=>void,
}

export enum States {
    "authorized" = "Authorized",
    "notAuthorized"= "Not Authorized",
    "verifying"= "Verifying"
}