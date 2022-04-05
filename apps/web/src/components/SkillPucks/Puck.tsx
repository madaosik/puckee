import React, { useEffect } from "react";
import { MouseEventHandler } from "react"
import { FaHockeyPuck } from "react-icons/fa";

interface PuckProps {
    size: number,
    active: boolean,
    key: string,
    index: number,
  }
  
interface ChangeablePuckProps extends PuckProps {
    onClickCb: (value: number) => MouseEventHandler<SVGElement>
// onHoverCb?: (puckId: number) => void
}

export const Puck = ( {size, active, key, index} : PuckProps ) => {
return(
    <FaHockeyPuck size={size}
                color={active ? "#000000" : "#dcdcdc"  }
                key={key + ":level-" + index}
                />
)
}

export const ChangeablePuck = ( {onClickCb, ...props} : ChangeablePuckProps ) => {
// useEffect(() => {

// })



return(
    <FaHockeyPuck size={props.size}
                color={props.active ? "#000000" : "#dcdcdc" }
                key={props.key + ":level-" + props.index}
                onClick={() => onClickCb(props.index)}/>
)
}

// 