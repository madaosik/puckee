import { GameLocation } from "../types";
import { GameLocOption } from "../types/Game";

export const gameLocOptions = () => {
    var locStrings: string[] = Object.keys(GameLocation)
                            .filter((key: any) => !isNaN(Number(GameLocation[key])))

    var locOptions = [] as GameLocOption[]
    locStrings.forEach((loc, locIndex) => {
        // Enum array contains also the numbered keys, so we need to skip them
        if (isNaN(Number(loc))) {
            locOptions.push({value: locIndex, label: loc})
        }
    })
    return locOptions
}

export default gameLocOptions