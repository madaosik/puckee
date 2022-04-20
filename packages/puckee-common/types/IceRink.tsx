import { Serializable } from ".";
import { SelectedGameLoc } from "./Game";

export interface IIceRink {
    id: number,
    name: string,
    address: string,
    price_per_hour: number,
  }

export class IceRink implements Serializable<IceRink> {
    id: number
    name: string
    address: string
    price_per_hour: number

    generateLocOption = () : SelectedGameLoc=> {
        return {value: this.id, label: this.name, address: this.address, price_per_hour: this.price_per_hour}
    }

    deserialize = (data: IIceRink): IceRink => {
        this.id = Number(data.id)
        this.name = data.name
        this.address = data.address
        this.price_per_hour = Number(data.price_per_hour)

        return this
    }
    serialize(input: IceRink): Object {
        throw new Error ("Not implemented!")
    }
}

// export type IceRinkOption = IceRink