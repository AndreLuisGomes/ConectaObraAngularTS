export interface Error{
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface ApiError{
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;   
}