import React from "react";
import { FormInput, InputLabel } from "../../../FormElements";

interface NewGameGoaliesProps {
    goalieRenum: string
    setGoalieRenumCb: (value: string) => void
}

export default function NewGameGoalies( {goalieRenum, setGoalieRenumCb} : NewGameGoaliesProps) {
    return (
        <div className="newGame-players-rootBox">
        <div className="newGame-players-leftCol">
            <div className="form-input-flex">
                <InputLabel content="Odměna"/>
                <div className="input-group">
                    <FormInput type="number" min="0" value={goalieRenum} className="content-right"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setGoalieRenumCb(e.currentTarget.value)}/>
                    <div className="input-group-append">
                        <span className="input-group-text shadow rounded">Kč</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="newGame-players-rightCol">
            <div className="newGame-basicInfo-row detailed player-split-upper">
                Registrovani brankari
            </div>
            <div className="newGame-basicInfo-row detailed player-split-below">
                Neregistrovani brankari
            </div>
        </div>
    </div>
    )
}