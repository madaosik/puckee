import React from "react";
import { FormInput, InputLabel } from "../../../FormElements";

interface NewGameRefereesProps {
    refereeRenum: string
    setRefereeRenumCb: (value: string) => void
}

export default function NewGameReferees( {refereeRenum, setRefereeRenumCb} : NewGameRefereesProps) {
    return (
        <div className="newGame-players-rootBox">
            <div className="newGame-players-leftCol">
                <div className="form-input-flex">
                    <InputLabel content="Odměna"/>
                    <div className="input-group">
                        <FormInput type="number" min="0" value={refereeRenum} className="content-right"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRefereeRenumCb(e.currentTarget.value)}/>
                        <div className="input-group-append">
                            <span className="input-group-text shadow rounded">Kč</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newGame-players-rightCol">
                <div className="newGame-basicInfo-row detailed player-split-upper">
                    Registrovani rozhodci
                </div>
                <div className="newGame-basicInfo-row detailed player-split-below">
                    Neregistrovani rozhodci
                </div>
            </div>
        </div>
    )
}