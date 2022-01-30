export interface Serializable<T> {
    serialize(input: T): Object
    deserialize(input: Object): T
}

export * from './Athlete'
export * from './Game'