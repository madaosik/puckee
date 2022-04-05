import React from "react"

interface SkillDescriptionProps {
    skillValue: number
}

export const SkillDescription = ( { skillValue } : SkillDescriptionProps ) => {
    // const [selectedSkill, setSelectedSkill] = useState(previousSkill)
    
    const playerSkillDescription = [
        "Vyber počet puků výše",
        "1 - Neumíš nic", "2 - Umíš něco", "3 - Hraješ slušně",
        "4 - Nadprůměrný", "5 - Velmi výrazný", "6 - Mezi amatéry excelentní"
    ]
    return (
        <>
            { skillValue >= 0 && playerSkillDescription[skillValue] }
        </>
    )
}