import React from "react"

interface SkillDescriptionProps {
    skillValue: number
}

export const SkillDescription = ( { skillValue } : SkillDescriptionProps ) => {
    // const [selectedSkill, setSelectedSkill] = useState(previousSkill)
    
    const playerSkillDescription = [
        "Vyber počet puků výše",
        "1 - Jsi úplně na začátku", 
        "2 - Hraješ jen pár měsíců",
        "3 - Tvá hra je solidní",
        "4 - Jsi nadprůměrně schopný",
        "5 - Na amatérském ledě jsi velmi výrazný",
        "6 - Mezi amatéry jsi excelentní"
    ]
    return (
        <>
            { 
                skillValue > 0 ?
                    (
                        <div className="mt-2 fw-bolder">
                            { playerSkillDescription[skillValue] }
                        </div>
                    ) 
                    :
                    (
                        <div className="mt-2">
                            { playerSkillDescription[skillValue] }
                        </div>
                    )
            }
        </>
    )
}