import { Status } from "./status"

export interface Suporte{
    id: string
    tipo: string
    tag: string
    guiaNome: string
    descricao: string
    status: string
    listaStatus : Status[] 
}