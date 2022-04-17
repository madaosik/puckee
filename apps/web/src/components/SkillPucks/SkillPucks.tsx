import React, { useState, MouseEventHandler, useEffect} from 'react';
import { insertContentsInsideObjcInterfaceBlock } from '../../../node_modulesOLD/@expo/config-plugins/build/ios/codeMod';
import { Puck, ChangeablePuck } from './Puck'

export interface SkillPucksProps {
  skillLevel: number
  puckSize: number
  iconKey: string
  className?: string
}

export const SkillPucks = ( props: SkillPucksProps ) : JSX.Element => {
  let levelPucks: JSX.Element[] = []
  for(let i=0; i < 6; i++) {
    if(i < props.skillLevel) {
        levelPucks.push(<Puck size={props.puckSize} active={true} puckKey={props.iconKey + ":level" + i} key={props.iconKey + ":level" + i} index={i}/>)
    } else {
        levelPucks.push(<Puck size={props.puckSize} active={false} puckKey={props.iconKey + ":level" + i} key={props.iconKey + ":level" + i} index={i}/>)
    }
  }

  return (
        <div className={props.className}>
          {levelPucks}
        </div>
  )
}

const generateInactivePucks = (puckSize: number, iconKey: string, onClickCb: any) => {
  let levelPucks: JSX.Element[] = []
  
  for(let i=0; i < 6; i++) 
    {
        levelPucks.push(<ChangeablePuck size={puckSize} active={false} puckKey={iconKey + ":level" + i} index={i} onClickCb={onClickCb}/>)
    }
  return levelPucks
}

