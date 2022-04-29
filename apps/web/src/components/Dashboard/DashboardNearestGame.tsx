import Avatar from "@mui/material/Avatar"
import { stringAvatar } from 'puckee-common/utils/avatar'
import { Athlete, AthleteRole, Game, IceRink, IGame } from "puckee-common/types"
import React from "react"
import { SkillPucks } from "../SkillPucks/SkillPucks"
import { Link } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi"
import { MdAccessTime, MdLocationOn } from "react-icons/md"
import { PlayerIcon, GoalieIcon, RefereeIcon } from "../../Icons"
import { FinancialsInGameList } from "../Games/FinancialsInGameList"
import { HoverableGameAttendanceStatus } from "../Games/HoverableGameAttendanceStatus"
import { IoMdArrowDropright } from "react-icons/io"

interface DashboardNearestGameProps {
    user: Athlete
    gameObj: IGame
    icerink: IceRink
}

export default function DashboardNearestGame( { user, icerink, gameObj } : DashboardNearestGameProps)
{
    const game = new Game().deserialize(gameObj)
    return(
        <div className="itemInList">
            <div className="itemInList-col profilePhoto">
                {/* <Avatar {...stringAvatar(athlete.name)} /> */}
                {/* <CgProfile size={40}/> */}
                <Avatar {...stringAvatar(game.organizers[0].name, 40)} />
            </div>
            <div className="itemInList-col nameAndExpSkill">
                <div style={{'color': '#002D63'}}>
                    {game.name}
                </div>
                <div className="itemInList-col expSkillAndOrg">
                    <SkillPucks className="itemInList-col expSkill" skillLevel={game.exp_skill} puckSize={18} iconKey={'game-' + game.id + '-puck'}/>
                    {game.organizers[0].id == user.id &&
                            <div className="itemInList-col org">
                                <Link to={"/games/" + game.id + "/edit"}>
                                    <FiEdit2 size={18}/>
                                </Link>
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
                        {(game.players.length + game.anonym_players.length) + '/' + game.exp_players_cnt}
                    </div>
                    <div>
                        {(game.goalies.length + game.anonym_goalies.length)  + '/' + game.exp_goalies_cnt}
                    </div>
                    <div>
                        {(game.referees.length + game.anonym_referees.length)  + '/' + game.exp_referees_cnt}
                    </div>
                </div>
                <div className="itemInList-col attendanceRoleIcon">
                    <div><PlayerIcon color="#002D63" height={18}/></div>
                    <div><GoalieIcon color="#002D63" height={18}/></div>
                    <div><RefereeIcon color="#002D63" height={18}/></div>
                </div>
                <div className="itemInList-col attendanceMoney">
                    <div><FinancialsInGameList role={AthleteRole.Player} value={game.est_price}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Goalie} value={game.goalie_renum}/></div>
                    <div><FinancialsInGameList role={AthleteRole.Referee} value={game.referee_renum}/></div>
                </div>
            </div>
            <HoverableGameAttendanceStatus
                    isInvertedColor={false}
                    game={game}
                    user={user}
                    classStr="itemInList-col attendanceStatus"
                    joinBtnClass="btn btn-sm btn-block btn-outline-primary rounded"
            />
            <div className="itemInList-col detailArrow">
                <Link to={"/games/" + game.id}><IoMdArrowDropright size={30}/></Link>
            </div>
        </div>
    )
}