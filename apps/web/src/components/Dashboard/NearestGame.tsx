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
    icerink: any
}

export default function NearestGame( { user, icerink, gameObj } : DashboardNearestGameProps)
{
    const game = new Game().deserialize(gameObj)
    return(
        <div className="d-flex flex-row justify-content-between align-items-center mb-1 p-1 pb-3 bottomBorder nearestGame">
            <div className="d-flex flex-column justify-content-center me-1 flex-1">
                {/* <Avatar {...stringAvatar(athlete.name)} /> */}
                {/* <CgProfile size={40}/> */}
                <Avatar {...stringAvatar(`${game.organizers[0].name} ${game.organizers[0].surname}`, 50)} />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center me-2 flex-5">
                <div style={{'color': '#002D63', 'fontWeight': 'bold', 'fontSize': '0.95rem'}}>
                    {game.name}
                </div>
                <div className="d-flex flex-column justify-content-center expSkillAndOrg">
                    <div className="d-flex flex-row">
                        <SkillPucks className="itemInList-col expSkill" skillLevel={game.exp_skill} puckSize={18} iconKey={'game-' + game.id + '-puck'}/>
                        {
                            game.organizers[0].id == user.id &&
                                    <div className="itemInList-col org">
                                        <Link to={"/games/" + game.id + "/edit"}>
                                            <FiEdit2 size={18}/>
                                        </Link>
                                    </div>
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center flex-6 small">
                <div className="d-flex flex-row justify-content-center align-items-center w-100 flex-1">
                    <div className="d-flex flex-row justify-content-end me-1 flex-1">
                        <MdAccessTime/>
                    </div>
                    <div className="d-flex flex-row justify-content-start me-1 flex-4">
                        {game.startTimeString() + " - " + game.endTimeString() + ', ' + game.dateString()}
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center flex-1 w-100">
                    <div className="d-flex flex-row justify-content-end me-1 flex-1">
                        <MdLocationOn/>
                    </div>
                    <div className="d-flex flex-row justify-content-start me-1 flex-4">
                        {icerink.name}
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center flex-1 w-100">
                    <div className="d-flex flex-row justify-content-end flex-1 me-1"></div>
                    <div className="d-flex flex-row flex-7">
                        <div className="d-flex flex-row justify-content-center me-2">
                            <div className="me-1"><PlayerIcon color="#002D63" height={18}/></div>
                            <div>{(game.players.length + game.anonym_players.length) + '/' + game.exp_players_cnt}</div>
                        </div>
                        <div className="d-flex flex-row justify-content-center me-2 ms-1">
                            <div className="me-1"><GoalieIcon color="#002D63" height={18}/></div>
                            <div>{(game.goalies.length + game.anonym_goalies.length)  + '/' + game.exp_goalies_cnt}</div>
                        </div>
                        <div className="d-flex flex-row justify-content-center me-2 ms-1">
                            <div className="me-1"><RefereeIcon color="#002D63" height={18}/></div>
                            <div>{(game.referees.length + game.anonym_referees.length)  + '/' + game.exp_referees_cnt}</div>
                        </div>
                    </div>
                </div>
            </div>
            <HoverableGameAttendanceStatus
                    isInvertedColor={false}
                    showAttDesc={false}
                    showMoney={true}
                    game={game}
                    user={user}
                    classStr="itemInList-col attendanceStatus"
                    joinBtnClass="btn btn-sm btn-block btn-outline-primary rounded"
            />
            <div className="d-flex flex-column justify-content-center align-items-end flex-1">
                <Link to={"/games/" + game.id}><IoMdArrowDropright size={30}/></Link>
            </div>
        </div>
    )
}