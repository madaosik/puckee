import { AthleteRole } from "../types";
import { AthleteRoleOption } from "../types/Athlete";

export const playerRoleOptions = () => {
    var roleStrings: string[] = Object.keys(AthleteRole)
                            .filter((key: any) => !isNaN(Number(AthleteRole[key])))
                            .filter(key => (key != "INVALID") && (key != "User"))

    var roleOptions = [] as AthleteRoleOption[]

    roleStrings.forEach((role, roleInd) => {
        // Enum array contains also the numbered keys, so we need to skip them
        if (isNaN(Number(role))) {
            roleOptions.push({value: roleInd+2, label: role})
        }
    })
    return roleOptions
}

export default playerRoleOptions