export interface IAuthResponse {
    username: string;
    accessToken: string;
    refreshToken: string;
}


export interface IAuthRequest{
    username: string;
    password: string;
}

export interface IUser {
    id: string;
    username: string;
    hashedPassword: string;
    isActive: boolean;
    roles: IRole[];
}

export interface IRole {
    id: number;
    name: string;
    privileges: IPrivilege[];
}

export interface IPrivilege {
    id: number;
    name: string;
}