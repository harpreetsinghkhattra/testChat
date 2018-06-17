export interface User {
    _id: string;
    email: string;
    userType?: string;
    firstName?: string;
    lastName?: string;
    status?: number;
    deletedStatus?: number;
    userAccessToken?: string;
    createdTime?: string;
    updatedTime?: string;
}