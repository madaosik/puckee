import React from 'react';
import { FaHockeyPuck } from "react-icons/fa";

type Props = {
    perfLevel: number
    puckSize: number
    iconKey: string
    className: string
  }  

const SkillPucks = ( {perfLevel, puckSize, iconKey, className}: Props ) : JSX.Element => {
    let levelPucks: any[] = []

    for(let i=0; i < 6; i++) {
        if(i < perfLevel) {
            levelPucks.push(<FaHockeyPuck size={puckSize} color="#000000" key={iconKey + ":level " + i}/>);
        } else {
            levelPucks.push(<FaHockeyPuck size={puckSize} color="#dcdcdc" key={iconKey + ":level" + i}/>);
        }
      }

    return (
          <div className={className}>
            {levelPucks}
          </div>
    )
}

export default SkillPucks

