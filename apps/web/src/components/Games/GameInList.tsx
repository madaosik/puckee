import { useAppSelector } from "puckee-common/redux"
import { Athlete, AthleteRole, attendanceRole, Game, IAthlete, IGame } from "puckee-common/types"
import { getDateFromString, removeSeconds } from "puckee-common/utils"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { SkillPucks } from "../SkillPucks/SkillPucks"
import { CgProfile}  from 'react-icons/cg'
import { FiEdit2 } from 'react-icons/fi'
import { IoMdArrowDropright } from 'react-icons/io'
import { FinancialsInGameList } from "./FinancialsInGameList"
import { GameAttendanceRoleStatus } from "./GameAttendanceRoleStatus"
import { MdAccessTime, MdLocationOn } from 'react-icons/md'
import { HoverableGameAttendanceStatus } from "./HoverableGameAttendanceStatus"
import { useAuth } from "puckee-common/auth"
import { GoalieIcon, PlayerIcon, RefereeIcon } from "../../Icons"
import Avatar from "@mui/material/Avatar"
import { stringAvatar } from 'puckee-common/utils/avatar'

interface GameInListProps {
    gameData: IGame
    icerink: any
}

const GameInList = ( {gameData, icerink}: GameInListProps ) => {
    const auth = useAuth()
    const game = new Game().deserialize(gameData)
    const user = new Athlete().deserialize(auth.userData.athlete)

    return (
        <div className="itemInList">
            <div className="itemInList-col profilePhoto">
                {/* <Avatar {...stringAvatar(athlete.name)} /> */}
                {/* <CgProfile size={40}/> */}
                <Avatar {...stringAvatar(game.organizers[0].name, 40)} />
            </div>
            <div className="itemInList-col nameAndExpSkill">
                <div>
                    {game.name}
                </div>
                <div className="itemInList-col expSkillAndOrg">
                    <SkillPucks className="itemInList-col expSkill" skillLevel={game.exp_skill} puckSize={18} iconKey={'game-' + game.id + '-puck'}/>
                    {game.organizers[0].id == user.id &&
                            <div className="itemInList-col org">
                                <FiEdit2 size={18}/>
                            </div>
                    }
                </div>
            </div>
            <div className="itemInList-col dateTimeLoc">
                <div className="itemInList-col dateTimeLoc-row">
                    <div className="itemInList-col dateTimeLoc-row icon"><MdAccessTime/></div>
                    <div className="itemInList-col dateTimeLoc-row text">
                        {game.startTimeString() + " - " + game.endTimeString() + ', ' + game.dateString()}</div>
                </div>
                <div className="itemInList-col dateTimeLoc-row">
                    <div className="itemInList-col dateTimeLoc-row icon"><MdLocationOn/></div>
                    <div className="itemInList-col dateTimeLoc-row text">{icerink.name}</div>
                </div>
            </div>
            <div className="itemInList-col attendance">
                <div className="itemInList-col attendanceCnt">
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
                <div className="itemInList-col attendanceRoleIcon">
                    <div><PlayerIcon color="black" height={18}/></div>
                    <div><GoalieIcon color="black" height={18}/></div>
                    <div><RefereeIcon color="black" height={18}/></div>
                </div>
                <div className="itemInList-col attendanceMoney">
                    <div><FinancialsInGameList role={AthleteRole.Player} value={game.est_price}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Goalie} value={game.goalie_renum}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Referee} value={game.referee_renum}/></div>
                </div>
            </div>
            <HoverableGameAttendanceStatus
                    // attStatusJustUpdated={attStatusJustUpdated}
                    // statusUpdateCb={updateAttStatusFlag}
                    isInvertedColor={false}
                    game={game}
                    user={user}
                    classStr="itemInList-col attendanceStatus"
                    joinBtnClass="btn btn-sm btn-block btn-outline-primary rounded"
                    // currentGameRole={gameRole}
                    // roleSetter={updateGameStatus}
            />
            {/* <div className="itemInList-col attendanceStatus" onMouseOver={attendanceStatusMouseOver} onMouseOut={attendanceStatusMouseOut} > */}
                {/* <GameAttendanceRoleStatus role={gameRole} roleSetter={setGameRole}/> */}
                {/* <GameAttendanceShortcut attendanceSetter={setGameRole} role={gameRole}/> */}
            {/* </div> */}
            <div className="itemInList-col detailArrow">
                <Link to={"/games/" + game.id}><IoMdArrowDropright size={30}/></Link>
            </div>
        </div>
    )
}

export default GameInList