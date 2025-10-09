import { Status } from "./status"

export interface Spool{
    id: string
    tipo: string
    tag: string
    status: Status[]
}