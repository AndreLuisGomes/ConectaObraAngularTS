export interface AuthResponse {
    nome: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
}