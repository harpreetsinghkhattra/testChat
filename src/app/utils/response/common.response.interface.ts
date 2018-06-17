export interface Response<T> {
    status?: number;
    code?: number;
    data?: T,
    message?: string,
    emptyKeys?: any,
    error?: boolean
}
