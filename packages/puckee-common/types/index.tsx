export interface Serializable<T> {
    serialize(input: T): Object
    deserialize(input: Object): T
}

export type AccessToken = string | null | void

export type Credentials = {
    email: string,
    password: string
}

export * from './Athlete'
export * from './Game'