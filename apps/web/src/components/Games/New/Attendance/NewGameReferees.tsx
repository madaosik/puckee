import { Athlete, AthleteOption } from "puckee-common/types";
import React from "react";
import { FormInput, InputLabel } from "../../../FormElements";
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta} from 'react-select';
import { selectCustomStyles } from ".";

interface NewGameRefereesProps {
    regReferees: Athlete[]
    nonRegReferees: Athlete[]
    refereeRenum: string
    setRegRefereesCb: React.Dispatch<React.SetStateAction<Athlete[]>>
    setNonRegRefereesCb: React.Dispatch<React.SetStateAction<Athlete[]>>
    setRefereeRenumCb: (value: string) => void
}

export default function NewGameReferees( {regReferees, nonRegReferees, refereeRenum, setRegRefereesCb, setNonRegRefereesCb, setRefereeRenumCb} : NewGameRefereesProps) {
    const handleSelectionUpdate = (option: readonly AthleteOption[] | unknown, actionMeta: ActionMeta<AthleteOption>) =>  { 
        // setSelectedLoc(option)
        // setPitchPrice(option.price_per_hour)
    }
    
    const RefereeSelect = () => {
        return (
          <Select
            closeMenuOnSelect={true}
            components={makeAnimated()}
            defaultValue={""}
            options={[]}
            placeholder="Hledej rozhodčí"
            className="roleMultiSelect shadow"
            onChange={handleSelectionUpdate}
            noOptionsMessage={() => "Rozhodčí nenalezen"}
            styles={selectCustomStyles}
          />
        );
      }
    
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
                    <div><RefereeSelect/></div>
                    <div>Registrovaní brankáři: {regReferees.length}</div>
                </div>
                <div className="newGame-basicInfo-row detailed player-split-below">
                    <div></div>
                    <div>Neregistrovaní rozhodčí: {nonRegReferees.length}</div>
                </div>
            </div>
        </div>
    )
}