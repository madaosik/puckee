import React, { useEffect } from "react";
import { MouseEventHandler } from "react"
import { FaHockeyPuck } from "react-icons/fa";

interface PuckProps {
    size: number,
    active: boolean,
    puckKey: string,
    index: number,
  }
  
interface ChangeablePuckProps extends PuckProps {
    onClickCb: (value: number) => MouseEventHandler<SVGElement>
// onHoverCb?: (puckId: number) => void
}

export const Puck = ( {size, active, puckKey, index} : PuckProps ) => {
    return (
        <FaHockeyPuck size={size}
                    color={active ? "#000000" : "#dcdcdc"  }
                    key={puckKey + ":level-" + index}
                    />
    )
}

export const ChangeablePuck = ( {onClickCb, ...props} : ChangeablePuckProps ) => {
    return (
            <FaHockeyPuck size={props.size}
                        color={props.active ? "#000000" : "#dcdcdc" }
                        key={props.puckKey + ":level-" + props.index}
                        onClick={() => onClickCb(props.index)}/>
    )
}

// 