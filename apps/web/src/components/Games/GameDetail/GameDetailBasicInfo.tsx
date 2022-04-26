import { fetchIceRinkById } from 'puckee-common/api'
import { Game } from 'puckee-common/types'
import React, { useState } from 'react'
import { MdAccessTime, MdLocationOn, MdDateRange, MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineFileText } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { SkillPucks } from '../../SkillPucks/SkillPucks'
import { GoalieIcon, PlayerIcon, RefereeIcon } from '../../../Icons'
import { AthleteBadge } from '../../AthleteBadge'

interface GameDetailBasicInfoProps {
    game: Game
}

export default function GameDetailBasicInfo ( { game } : GameDetailBasicInfoProps)
{
    const { data, isSuccess } = useQuery(["icerink", game.location_id], () => fetchIceRinkById(game.location_id));
    const [realGameSkill, setRealGameSkill] = useState(3)
    
    return (
        <div className="content-row gameDetail-basicInfo">
            <div className="content-inner-row heading">
                Základní informace
            </div>
            <div className="content-inner-row data">
                {/* Dva radky obsahu*/}
                <div className="d-flex flex-column justify-content-between">
                    {/* Prvni radek se tremi sloupci (cas, organizator, pozvanky*/}
                    <div className="d-flex flex-row justify-content-between gameDetail-basicInfo-timeDateRemarks">
                        <div className='d-flex flex-row justify-content-evenly gameDetail-basicInfo-orgDetails'>
                            <div className='d-flex flex-column justify-content-start pt-1 flex-3'>
                                <div className='d-flex flex-row mt-1'>
                                    <div className='me-2'><MdDateRange size={24}/></div>
                                    <div>{game.dateString({year: 'numeric'})}</div>
                                </div>
                                <div className='d-flex flex-row mt-2'>
                                    <div className='me-2'><MdAccessTime size={24}/></div>
                                    <div>
                                        {game.startTimeString()} - {game.endTimeString()}
                                    </div>
                                </div>
                                <div className='d-flex flex-row mt-2'>
                                    <div className='me-2'><MdLocationOn size={24}/></div>
                                    <div>{isSuccess ? data.name : "Načítám"}</div>
                                </div>
                            </div>
                            <div className='d-flex flex-column justify-content-start flex-4'>
                                <div className='d-flex flex-row mh-100'>
                                    <div className='pt-2 me-2'><MdOutlineManageAccounts size={28}/></div>
                                    <div className="d-flex flex-column flex-wrap gameDetail-orgBadges">
                                        {game.organizers.map(o => <div className="mb-1 me-1"><AthleteBadge registered={true} athlete={o}/></div>)}
                                    </div>
                                </div>
                                {/* <div className='d-flex flex-row mt-2'>
                                    <div className='me-1'><MdLocationOn size={24}/></div>
                                    <div>{isSuccess ? data.name : "Načítám"}</div>
                                </div> */}
                            </div>
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-row justify-content-start me-1 flex-4">
                            <div className="d-flex flex-column pt-2 justify-content-start">
                                <div className='me-1'>
                                    <AiOutlineFileText size={24}/>
                                </div>
                            </div>
                            <div className="gameDetail-basicInfo-remarksContent mt-1">
                                {game.remarks}
                            </div>
                        </div>
                    </div>
                    {/* Druhy radek se tremi sloupci (uroven atd) */}
                    <div className="d-flex flex-row justify-content-between mt-2">
                        {/* Prvni sloupec (cas, datum) */}
                        <div className="d-flex flex-column align-items-center gameDetail-basicInfo-skill">
                            <div>Očekávaná úroveň</div>
                            <div><SkillPucks skillLevel={game.exp_skill} puckSize={24} iconKey={game.id + 'detail-exp-skill'}/></div>
                        </div>
                        {/* Druhy sloupec (organizatori) */}
                        <div className="d-flex flex-row justify-content-evenly flex-5">
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column justify-content-center me-2"><PlayerIcon color="black" height={40}/></div>
                                <div className='d-flex flex-column justify-content-center'>{game.players.length + game.anonym_players.length}/{game.exp_players_cnt}</div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column justify-content-center me-2"><GoalieIcon color="black" height={40}/></div>
                                <div className='d-flex flex-column justify-content-center'>{game.goalies.length + game.anonym_goalies.length}/{game.exp_goalies_cnt}</div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column justify-content-center me-2"><RefereeIcon color="black" height={40}/></div>
                                <div className='d-flex flex-column justify-content-center'>{game.referees.length + game.anonym_referees.length}/{game.exp_referees_cnt}</div>
                            </div>
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-column align-items-center flex-3">
                            <div>Reálná úroveň</div>
                            <div><SkillPucks skillLevel={realGameSkill} puckSize={24} iconKey={game.id + 'detail-exp-skill'}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
