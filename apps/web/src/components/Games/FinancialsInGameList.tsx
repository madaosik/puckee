import React from "react"
import { AthleteRole } from "puckee-common/types"

interface FinancialInGameListProps {
    role: AthleteRole
    value: number
}

export const FinancialsInGameList = ( { role, value } : FinancialInGameListProps) => {
    if (value == 0) {
        return <div>{value} Kč</div>
    }
    
    if (role == AthleteRole.Player) {
        return <div>{value} Kč</div>
    } else if (role == AthleteRole.Goalie || role == AthleteRole.Referee) {
        return <div className="renumRecord">+{value} Kč</div>        
    } else {
        console.error("Unknown athlete role provided to FinancialsInGameList component!")
        return <div>{value}</div>
    }
}