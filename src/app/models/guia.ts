import { Cliente } from "./cliente"

export interface Guia{
    id: string
    nome: string
    cliente: Cliente
    status: string
    local: string
}