import { fetchIceRinkById } from 'puckee-common/api'
import { IGame } from 'puckee-common/types'
import { getDateFromString, removeSeconds } from 'puckee-common/utils'
import React, { useState } from 'react'
import { MdAccessTime, MdLocationOn, MdDateRange, MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineFileText } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { SkillPucks } from '../../SkillPucks/SkillPucks'
import LoremIpsum from 'react-lorem-ipsum'
import { GoalieIcon, PlayerIcon } from '../../../Icons'

interface GameDetailBasicInfoProps {
    game: IGame
}

export default function GameDetailBasicInfo ( { game } : GameDetailBasicInfoProps)
{
    const { data, isSuccess } = useQuery(["icerink", game.location_id], () => fetchIceRinkById(game.location_id));
    const start_time = removeSeconds(game.start_time)
    const end_time = removeSeconds(game.end_time)
    const date = getDateFromString(game.date)
                    .toLocaleString('cs-CZ', {weekday: 'short', day:'numeric', month: 'numeric', year: 'numeric'})

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
                            <div className='d-flex flex-column justify-content-start gameDetail-basicInfo-dateTime'>
                                <div className='d-flex flex-row mt-1'>
                                    <div className='me-1'><MdDateRange size={24}/></div>
                                    <div>{date}</div>
                                </div>
                                <div className='d-flex flex-row mt-2'>
                                    <div className='me-1'><MdAccessTime size={24}/></div>
                                    <div>{start_time}-{end_time}</div>
                                </div>
                            </div>
                            <div className='d-flex flex-column justify-content-start gameDetail-basicInfo-orgLoc'>
                                <div className='d-flex flex-row mt-1'>
                                    <div className='me-1'><MdOutlineManageAccounts size={24}/></div>
                                    <div>{game.organizers.map(o => o.name).join(', ')}</div>
                                </div>
                                <div className='d-flex flex-row mt-2'>
                                    <div className='me-1'><MdLocationOn size={24}/></div>
                                    <div>{isSuccess ? data.name : "Načítám"}</div>
                                </div>
                            </div>
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-row justify-content-end gameDetail-basicInfo-remarks">
                            <div className="d-flex flex-column justify-content-start">
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
                        <div className="d-flex flex-row justify-content-evenly gameDetail-basicInfo-attendanceSec">
                            <div className="d-flex flex-row">
                                <div className="me-2"><PlayerIcon color="black" height={30}/></div>
                                <div>{game.players.length}/{game.exp_players_cnt}</div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="me-2"><GoalieIcon color="black" height={30}/></div>
                                <div>{game.goalies.length}/{game.exp_goalies_cnt}</div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="me-2">R</div>
                                <div>{game.referees.length}/{game.exp_referees_cnt}</div>
                            </div>
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-column align-items-center gameDetail-basicInfo-skill">
                            <div>Reálná úroveň</div>
                            <div><SkillPucks skillLevel={realGameSkill} puckSize={24} iconKey={game.id + 'detail-exp-skill'}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
