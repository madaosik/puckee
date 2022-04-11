import { useAppSelector } from "puckee-common/redux"
import { Athlete, AthleteRole, attendanceRole, IGame } from "puckee-common/types"
import { getDateFromString, removeSeconds } from "puckee-common/utils"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { SkillPucks } from "../SkillPucks/SkillPucks"
import { CgProfile}  from 'react-icons/cg'
import { FiEdit2 } from 'react-icons/fi'
import { IoMdArrowDropright } from 'react-icons/io'
import { FinancialsInGameList } from "./FinancialsInGameList"
import { GameAttendanceRoleStatus } from "./GameAttendanceRoleStatus"
import { MdAccessTime, MdLocationOn } from 'react-icons/md'


interface GameInListProps {
    game: IGame
    icerink: any
}

const GameInList = ( {game, icerink}: GameInListProps ) => {
    const { token, userData } = useAppSelector((state) => state.auth);
    const user = new Athlete().deserialize(userData)
    const start_time = removeSeconds(game.start_time)
    const end_time = removeSeconds(game.end_time)
    const date = getDateFromString(game.date)
                    .toLocaleString('cs-CZ', {weekday: 'short', day:'numeric', month: 'numeric'})

    const [gameRole, setGameRole] = useState<AthleteRole | undefined>(attendanceRole(user, game))

    return (
        <div className="gameInList">
            <div className="gameInList-col profilePhoto">
                <CgProfile size={40}/>
            </div>
            <div className="gameInList-col nameAndExpSkill">
                <div>
                    {game.name}
                </div>
                <div className="gameInList-col expSkillAndOrg">
                    <SkillPucks className="gameInList-col expSkill" skillLevel={game.exp_skill} puckSize={18} iconKey={'game-' +game.id + '-puck'}/>
                    {game.organizers[0].id == user.id &&
                            <div className="gameInList-col org">
                                <FiEdit2 size={18}/>
                            </div>
                    }
                </div>
            </div>
            <div className="gameInList-col dateTimeLoc">
                <div className="gameInList-col dateTimeLoc-row">
                    <div className="gameInList-col dateTimeLoc-row icon"><MdAccessTime/></div>
                    <div className="gameInList-col dateTimeLoc-row text">{start_time + " - " + end_time + ', ' + date}</div>
                </div>
                <div className="gameInList-col dateTimeLoc-row">
                    <div className="gameInList-col dateTimeLoc-row icon"><MdLocationOn/></div>
                    <div className="gameInList-col dateTimeLoc-row text">{icerink.name}</div>
                </div>
            </div>
            <div className="gameInList-col attendance">
                <div className="gameInList-col attendanceCnt">
                    <div>
                        {game.players.length + '/' + game.exp_players_cnt}
                    </div>
                    <div>
                        {game.goalies.length + '/' + game.exp_goalies_cnt}
                    </div>
                    <div>
                        {game.referees.length + '/' + game.exp_referees_cnt}
                    </div>
                </div>
                <div className="gameInList-col attendanceRoleIcon">
                    <div>H</div>
                    <div>G</div>
                    <div>R</div>
                </div>
                <div className="gameInList-col attendanceMoney">
                    <div><FinancialsInGameList role={AthleteRole.Player} value={game.est_price}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Goalie} value={game.goalie_renum}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Referee} value={game.referee_renum}/></div>
                </div>
            </div>
            <div className="gameInList-col attendanceStatus">
                <GameAttendanceRoleStatus role={gameRole} roleSetter={setGameRole}/>
                {/* <GameAttendanceShortcut attendanceSetter={setGameRole} role={gameRole}/> */}
            </div>
            <div className="gameInList-col detailArrow">
                <Link to={"#"}><IoMdArrowDropright size={30}/></Link>
            </div>
        </div>
    )
}

export default GameInList