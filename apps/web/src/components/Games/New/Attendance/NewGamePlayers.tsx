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


interface NewGamePlayersProps {
    regPlayers: IAthlete[]
    nonRegPlayers: IAnonymAthlete[]
    setRegPlayersCb : React.Dispatch<React.SetStateAction<IAthlete[]>>
    setNonRegPlayersCb : React.Dispatch<React.SetStateAction<IAnonymAthlete[]>>
    expPlayersCnt: number
}

export default function NewGamePlayers( {regPlayers, nonRegPlayers, expPlayersCnt, setRegPlayersCb, setNonRegPlayersCb} : NewGamePlayersProps ) {
    const [selectedAthlete, setSelectedAthlete] = useState<Athlete | unknown>(null);
    const [searchText, setSearchText] = useState("");
    const [inputText, setInputText] = useState("");
    const auth = useAuth()

    var playerSearchResults: IAthlete[] | undefined = undefined
    const setSearchTextDebounced = useRef(debounce(searchText => setSearchText(searchText), 500)).current;
  
    const { isLoading, isSuccess, data: playerData } = useAthleteSearch(searchText, AthleteRole.Player, auth.userData.athlete.id);

    if (isSuccess) {
      // Filter out the players that were already added
      playerSearchResults = playerData.filter((p : IAthlete)=> !regPlayers.find(regP => regP.id == p.id));
    }

    const handleChangePrimary = (player: IAthlete | unknown, actionMeta: ActionMeta<IAthlete>) => {
        setRegPlayersCb(oldAddedRegPlayers => [...oldAddedRegPlayers, player])
    };
    
    const removeRegPlayer = (playerId: number | string) => setRegPlayersCb(oldAddedRegPlayers => oldAddedRegPlayers.filter(p => p.id != playerId))
    const removeNonRegPlayer = (name: string | number) => setNonRegPlayersCb(oldAddedNonRegPlayers => oldAddedNonRegPlayers.filter(p => p.name != name))

    const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
      // prevent outside click from resetting inputText to ""
      if (event.action !== "input-blur" && event.action !== "menu-close") {
        setInputText(inputText)
        // setTypingFlag(true)
        setSearchTextDebounced(inputText);
      }
    };

    const addAnonymPlayer = (name: string) => {
      if (nonRegPlayers.some(p => p.name == name)) {
        return
      }

      const anonymPlayer : IAnonymAthlete = {
        // id: uuid()
        name: name,
        added_by: auth.userData.id
      }
      setNonRegPlayersCb(oldAddedNonRegPlayers => [...oldAddedNonRegPlayers, anonymPlayer])
      setInputText("")
    }

    const noOptionsSolver = (option: string, addAnonymPlayerCb: (name: string) => void) => {
      if (!isLoading && option == searchText && option.length > 0)
        return <NoSearchOptionsSolver option={option} onConfirmCb={addAnonymPlayerCb}/>
      else {
        return "Hráč nenalezen"
      }
    }

    const PlayerSelect = () => {
        return (
          <Select
            noOptionsMessage={input => noOptionsSolver(input.inputValue, addAnonymPlayer)}
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
    
    return (
        <div className="d-flex flex-row justify-content-between newGame-basicInfo-rootBox h-100 w-100">
            <div className="d-flex flex-column justify-content-center attendeeDetails-leftCol">
                <GameRoleAttendanceSummary role={AthleteRole.Player} cnt={regPlayers.length} totalCnt={expPlayersCnt}/>
            </div>


            <div className="d-flex flex-column justify-content-start attendeeDetails-rightCol">
                <div className="d-flex flex-column justify-content-start player-split-upper">
                  <div className="d-flex flex-row justify-content-between w-100">
                      <div>{PlayerSelect()}</div>
                      <div className="me-4 gameDetail-attendeeHeading ">
                          Registrovaní hráči: {regPlayers.length}
                        </div>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-start mt-1 p-1">
                  {
                    regPlayers.map(p => (
                      <Fragment>
                          {/* {page.items.map((game : IGame) => ( */}
                              <div className="mt-1 me-1">
                                <RemovableAthleteBadge key={p.id} athlete={p} registered={true} showFollow={true} removeCb={removeRegPlayer}/>
                              </div>
                          {/* ))} */}
                      </Fragment>
                      ))
                    }
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-start mt-4 player-split-lower">
                    <div className="d-flex flex-row justify-content-end me-4 gameDetail-attendeeHeading ">
                        Neregistrovaní hráči: {nonRegPlayers.length}
                    </div>
                    <div className="d-flex flex-row justify-content-start flex-wrap">
                      {
                      nonRegPlayers.map(p => (
                        <Fragment>
                            {/* {page.items.map((game : IGame) => ( */}
                                <div className="mt-1 me-1">
                                  <RemovableAthleteBadge key={p.name} athlete={p} registered={false} showFollow={false} removeCb={removeNonRegPlayer}/>
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