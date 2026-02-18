export interface AuthResponse {
    nome: string | null;
    acessToken: string | null;
    refreshToken: string | null;
    role: string | null;
}