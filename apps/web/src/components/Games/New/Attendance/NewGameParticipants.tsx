import { Athlete, AthleteOption, AthleteRole, IAnonymAthlete, IAthlete } from "puckee-common/types";
import React, { useState, useRef, Fragment, useEffect } from "react";
import GameRoleAttendanceSummary from "../../GameRoleAttendanceSummary";
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta, components, InputActionMeta} from 'react-select';
import { selectCustomStyles } from ".";
import useAthleteSearch, { searchAthleteByName } from "puckee-common/api/athlete";
import { debounce } from "lodash";
import { RemovableAthleteBadge } from "../../../AthleteBadge";
import { useAuth } from "puckee-common/auth";
import { NoSearchOptionsSolver } from "../NewSearchOptionsSolver";
import { numberLiteralTypeAnnotation } from "@babel/types";


interface NewGameParticipantsProps {
    role: AthleteRole
    registered: IAthlete[]
    nonRegistered: IAnonymAthlete[]
    setRegistered : React.Dispatch<React.SetStateAction<IAthlete[]>>
    setNonRegistered : React.Dispatch<React.SetStateAction<IAnonymAthlete[]>>
    expParticipantsCnt: number
}

export default function NewGameParticipants( {
                        role, 
                        registered, 
                        nonRegistered,
                        setRegistered,
                        setNonRegistered,
                        expParticipantsCnt 
                        } : NewGameParticipantsProps ) {

    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | unknown>(null);
    const [searchText, setSearchText] = useState("");
    const [inputText, setInputText] = useState("");
    const auth = useAuth()

    var athleteSearchResults: IAthlete[] | undefined = undefined
    const setSearchTextDebounced = useRef(debounce(searchText => setSearchText(searchText), 500)).current;
  
    const { isLoading, isSuccess, data: playerData } = useAthleteSearch(searchText, role, auth.userData.athlete.id);

    if (isSuccess) {
      // Filter out the players that were already added
      athleteSearchResults = playerData.filter((a : IAthlete)=> !registered.find(regA => regA.id == a.id));
    }

    const handleChangePrimary = (athlete: IAthlete | unknown, actionMeta: ActionMeta<IAthlete>) => {
      setRegistered(oldAddedRegPlayers => [...oldAddedRegPlayers, athlete])
    };
    
    const removeRegParticipant = (athleteId: number | string) => setRegistered(oldAddedRegAthletes => oldAddedRegAthletes.filter(p => p.id != athleteId))
    const removeNonRegParticipant = (name: string | number) => setNonRegistered(oldAddedNonRegAthletes => oldAddedNonRegAthletes.filter(p => p.name != name))

    const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
      // prevent outside click from resetting inputText to ""
      if (event.action !== "input-blur" && event.action !== "menu-close") {
        setInputText(inputText)
        setSearchTextDebounced(inputText);
      }
    };

    const addAnonymParticipant = (name: string) => {
      if (nonRegistered.some(p => p.name == name)) {
        return
      }

      const anonymAthlete : IAnonymAthlete = {
        name: name,
        added_by: auth.userData.id
      }
      setNonRegistered(oldAddedNonRegPlayers => [...oldAddedNonRegPlayers, anonymAthlete])
      setInputText("")
    }

    const noOptionsSolver = (option: string, addAnonymParticipant: (name: string) => void) => {
      if (!isLoading && option == searchText && option.length > 0)
        return <NoSearchOptionsSolver option={option} onConfirmCb={addAnonymParticipant}/>
      else {
        return "Hráč nenalezen"
      }
    }

    var roleDescription: Array<string> = []
    switch (role) {
      case (AthleteRole.Player):
        roleDescription =  ["hráči", "hráče"]
        break 
      case (AthleteRole.Goalie):
        roleDescription = ["brankáři", "brankáře"] 
        break
      case (AthleteRole.Referee):
        roleDescription = ["rozhodčí", "rozhodčího"]
        break
    }

    const PlayerSelect = () => {
        return (
          <Select
            noOptionsMessage={input => noOptionsSolver(input.inputValue, addAnonymParticipant)}
            placeholder={`Hledej ${roleDescription[1]}`}
            isClearable={true}
            isLoading={isLoading}
            inputValue={inputText}
            value={selectedAthlete}
            options={athleteSearchResults}
            getOptionLabel={athlete => athlete.name}
            onChange={handleChangePrimary}
            onInputChange={handleInputChangePrimary}
            styles={selectCustomStyles}
          />
        );
      }
    
    return (
        <div className="d-flex flex-row justify-content-between newGame-basicInfo-rootBox h-100 w-100">
            <div className="d-flex flex-column justify-content-center attendeeDetails-leftCol">
                <GameRoleAttendanceSummary role={role} cnt={registered.length} totalCnt={expParticipantsCnt}/>
            </div>


            <div className="d-flex flex-column justify-content-start attendeeDetails-rightCol">
                <div className={`d-flex flex-column justify-content-start player-split-upper ${role != AthleteRole.Player && "goalieRefs"}`}>
                  <div className="d-flex flex-row justify-content-between w-100">
                      <div>{PlayerSelect()}</div>
                      <div className="me-4 gameDetail-attendeeHeading ">
                          Registrovaní {roleDescription[0]}: {registered.length}
                        </div>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-start mt-1 p-1">
                  {
                    registered.map(p => (
                      <Fragment>
                          {/* {page.items.map((game : IGame) => ( */}
                              <div className="mt-1 me-1">
                                <RemovableAthleteBadge key={p.id} athlete={p} registered={true} showFollow={true} removeCb={removeRegParticipant}/>
                              </div>
                          {/* ))} */}
                      </Fragment>
                      ))
                    }
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-start mt-4 player-split-lower">
                    <div className="d-flex flex-row justify-content-end me-4 gameDetail-attendeeHeading ">
                        Neregistrovaní {roleDescription[0]}: {nonRegistered.length}
                    </div>
                    <div className="d-flex flex-row justify-content-start flex-wrap">
                      {
                      nonRegistered.map(p => (
                        <Fragment>
                            {/* {page.items.map((game : IGame) => ( */}
                                <div className="mt-1 me-1">
                                  <RemovableAthleteBadge key={p.name} athlete={p} registered={false} showFollow={false} removeCb={removeNonRegParticipant}/>
                                </div>
                            {/* ))} */}
                        </Fragment>
                        ))
                      }
                    </div>
                </div>
            </div>
        </div>
        )
}