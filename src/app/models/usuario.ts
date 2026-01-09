export interface usuario{
    id: string
    nome: string
    senha: string
    email: string
    funcao: string
    setor: string
}

export interface UsuarioLoginRequest{
    nome: string;
    senha: string;
}

export interface AuthResponse{
    nome: string | null;
    role: string | null;
}