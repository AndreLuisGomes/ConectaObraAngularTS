import { Cliente } from "./cliente"

export interface Guia{
    id: string
    local: string
    nome: string
    guiaStatus: string
    cliente: Cliente
}