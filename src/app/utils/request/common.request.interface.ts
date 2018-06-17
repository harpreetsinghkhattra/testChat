export interface Register {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirm_password?:string;
}

export interface Login{
    email?: string;
    password?: string;
}