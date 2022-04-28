import { AnonymAthlete, IAnonymAthlete } from './AnonymAthlete'
import { Athlete, IAthlete } from './Athlete'

export interface Serializable<T> {
    serialize(input: T): Object
    // deserialize(input: Object): T
}

export type AccessToken = string | null | void

export type Credentials = {
    email: string,
    password: string
}

export enum AlertType {
    success = "success",
    warning = "warning",
    info = "info",
    error = "error"
}

export interface AlertReport {
    type: AlertType
    msg: string
}


export type AthleteType = Athlete | IAthlete | IAnonymAthlete | AnonymAthlete

export * from './Athlete'
export * from './Game'
export * from './IceRink'
export * from './AnonymAthlete'