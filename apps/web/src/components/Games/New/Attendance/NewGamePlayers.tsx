import { Athlete, AthleteOption, AthleteRole, IAthlete } from "puckee-common/types";
import React, { useState, useRef, Fragment } from "react";
import GameRoleAttendanceSummary from "../../GameRoleAttendanceSummary";
import makeAnimated from 'react-select/animated';
import Select, {ActionMeta, InputActionMeta} from 'react-select';
import { selectCustomStyles } from ".";
import useAthleteSearch, { searchAthleteByName } from "puckee-common/api/athlete";
import { debounce } from "lodash";
import { RemovableAthleteBadge } from "../../../AthleteBadge";

interface NewGamePlayersProps {
    regPlayers: IAthlete[]
    nonRegPlayers: IAthlete[]
    setRegPlayersCb : React.Dispatch<React.SetStateAction<IAthlete[]>>
    setNonRegPlayersCb : React.Dispatch<React.SetStateAction<IAthlete[]>>
    expPlayersCnt: number
}

export default function NewGamePlayers( {regPlayers, nonRegPlayers, expPlayersCnt, setRegPlayersCb, setNonRegPlayersCb} : NewGamePlayersProps ) {
    // const [addedRegPlayers, setAddedRegPlayers] = useState<Athlete[]>([])
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | unknown>(null);
    const [searchText, setSearchText] = useState("");
    const [inputText, setInputText] = useState("");
    var playerSearchResults: IAthlete[] | undefined = undefined
    const setSearchTextDebounced = useRef(debounce(searchText => setSearchText(searchText), 500)).current;
  
    const { isLoading, isSuccess, data: playerData } = useAthleteSearch(searchText);

    if (isSuccess) {
      // playerSearchResults = playerData!.filter((p: IAthlete) => regPlayers.includes(p))
      playerSearchResults = playerData.filter((p : IAthlete)=> !regPlayers.find(regP => regP.id == p.id));
      // playerSearchResults = playerData
    }

    const handleChangePrimary = (player: IAthlete | unknown, actionMeta: ActionMeta<IAthlete>) => {
        setRegPlayersCb(oldAddedRegPlayers => [...oldAddedRegPlayers, player])
    };
    
    const removeRegPlayer = (playerId: number) => {
      setRegPlayersCb(oldAddedRegPlayers => oldAddedRegPlayers.filter(p => p.id != playerId))
    }

    const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
      // prevent outside click from resetting inputText to ""
      if (event.action !== "input-blur" && event.action !== "menu-close") {
        setInputText(inputText);
        setSearchTextDebounced(inputText);
      }
    };

    const PlayerSelect = () => {
        return (
          <Select
            noOptionsMessage={() => "Žádný hráč nebyl nalezen"}
            placeholder={"Hledej hráče"}
            isClearable={true}
            isLoading={isLoading}
            inputValue={inputText}
            value={selectedAthlete}
            options={playerSearchResults}
            getOptionLabel={athlete => athlete.name}
            onChange={handleChangePrimary}
            onInputChange={handleInputChangePrimary}
            styles={selectCustomStyles}
          />
        );
      }
    
    const renderBadges = () => {
      console.log("rendering")
      return (
        regPlayers.forEach((a) => {
            <div>
              <RemovableAthleteBadge key={a.id} iAthlete={a} registered={true} removeCb={removeRegPlayer}/>
            </div>
          })
        ) 
    }
    
    return (
        <div className="d-flex flex-row justify-content-between newGame-basicInfo-rootBox h-100 w-100">
            <div className="d-flex flex-column justify-content-center attendeeDetails-leftCol">
                <GameRoleAttendanceSummary role={AthleteRole.Player} cnt={regPlayers.length} totalCnt={expPlayersCnt}/>
            </div>


            <div className="d-flex flex-column justify-content-start attendeeDetails-rightCol">
                <div className="d-flex flex-column justify-content-start player-split-upper">
                  <div className="d-flex flex-row justify-content-between w-100">
                      <div>{PlayerSelect()}</div>
                      <div>Registrovaní hráči: {regPlayers.length}</div>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-start mt-1 p-1">
                  {
                    regPlayers.map(p => (
                      <Fragment>
                          {/* {page.items.map((game : IGame) => ( */}
                              <div className="mt-1 me-1">
                                <RemovableAthleteBadge key={p.id} iAthlete={p} registered={true} removeCb={removeRegPlayer}/>
                              </div>
                          {/* ))} */}
                      </Fragment>
                      ))
                    }
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-start mt-4">
                    <div className="d-flex flex-row justify-content-end">
                        Neregistrovaní hráči: {nonRegPlayers.length}
                    </div>
                    <div className="d-flex flex-row justify-content-start flex-wrap">
                        vypis
                    </div>
                </div>
            </div>
        </div>
        )
}