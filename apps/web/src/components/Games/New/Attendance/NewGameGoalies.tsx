import React from "react";
import { FormInput, InputLabel } from "../../../FormElements";
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta} from 'react-select';
import { Athlete, AthleteOption } from "puckee-common/types";
import { selectCustomStyles } from ".";

interface NewGameGoaliesProps {
    regGoalies: Athlete[]
    nonRegGoalies: Athlete[]
    goalieRenum: string
    setRegGoaliesCb: React.Dispatch<React.SetStateAction<Athlete[]>>
    setNonRegGoaliesCb: React.Dispatch<React.SetStateAction<Athlete[]>>
    setGoalieRenumCb: (value: string) => void
}

export default function NewGameGoalies( {regGoalies, nonRegGoalies, goalieRenum, setRegGoaliesCb, setNonRegGoaliesCb, setGoalieRenumCb} : NewGameGoaliesProps) {
    const handleSelectionUpdate = (option: readonly AthleteOption[] | unknown, actionMeta: ActionMeta<AthleteOption>) =>  { 
        // setSelectedLoc(option)
        // setPitchPrice(option.price_per_hour)
    }
    
    const GoalieSelect = () => {
        return (
          <Select
            closeMenuOnSelect={true}
            components={makeAnimated()}
            defaultValue={""}
            options={[]}
            placeholder="Hledej brankáře"
            className="roleMultiSelect shadow"
            onChange={handleSelectionUpdate}
            noOptionsMessage={() => "Brankář nenalezen"}
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
                <div><GoalieSelect/></div>
                <div>Registrovaní brankáři: {regGoalies.length}</div>
            </div>
            <div className="newGame-basicInfo-row detailed player-split-below">
                <div></div>
                <div>Neregistrovaní brankáři: {nonRegGoalies.length}</div>
            </div>
        </div>
    </div>
    )
}