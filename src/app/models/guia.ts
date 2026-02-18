import { Cliente } from "./cliente"

export interface Guia{
    id: string
    nome: string
    cliente: Cliente
    guiaStatus: string
    localizacao: string
}