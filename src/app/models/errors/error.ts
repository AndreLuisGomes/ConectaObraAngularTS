export interface Error{
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface ApiError{
    status: number;
    errors: ErrorFields[];
    mensagem: string;
}

export interface ErrorFields{
    campo : string;
    mensagem : string;
}