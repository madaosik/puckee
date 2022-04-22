import { Serializable } from "."

export const instanceOfAnonymAthlete = (object: any): object is IAnonymAthlete => {
    return !('roles' in object)
}

export interface IAnonymAthlete {
    id?: number
    name: string
    added_in?: string
    added_by: string
    created?: string
  }
  
export class AnonymAthlete implements Serializable<AnonymAthlete> {
    id: number
    name: string
    added_in: number
    added_by: number
    created: Date

    deserialize = (data: IAnonymAthlete): AnonymAthlete => {
        this.id = Number(data.id)
        this.name = data.name
        this.added_in = Number(data.added_in)
        this.added_by = Number(data.added_by)
        this.created = new Date(data.created!)
        return this
}

    serialize = (anonymAthlete: AnonymAthlete): any => {
        throw new Error('Method not implemented.')
    }
}