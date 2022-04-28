import Tooltip from '@mui/material/Tooltip'
import { NOTIFICATION, useNotifications } from 'puckee-common/context/NotificationsContext'
import { AthleteRole, Game } from 'puckee-common/types'
import React, { SVGProps } from 'react'
import { Link } from 'react-router-dom'

interface RoleSelectorProps {
  game: Game
  role: AthleteRole
  RoleIcon: React.ComponentType<SVGProps<SVGSVGElement>>
  rememberSelectedCb: (role: AthleteRole) => void
  isInvertedColor: boolean
}

export const RoleIconSelector = ( { game, role, RoleIcon, rememberSelectedCb,  isInvertedColor} : RoleSelectorProps ) => {
  const isFull = game.isFullForRole(role)
  const { setNotification } = useNotifications()

  const selectorCb = () => {
    if (isFull) {
      setNotification({message: `Pro roli '${AthleteRole[role]}' už na utkání není místo!`, variant: NOTIFICATION.ALERT, timeout: 4000})
    } else {
      rememberSelectedCb(role)
    }
  }

  const renderIcon = () : JSX.Element => {
    if (isFull) {
      return (
          <Tooltip title="Obsazeno!" followCursor>
            <div><RoleIcon color={isInvertedColor ? "grey" : "darkgrey"} height={35}/></div>
          </Tooltip>
      )
    } else {
      return (
        <Link to="#">
          <Tooltip title={`Přihlásit se jako ${AthleteRole[role]}`} followCursor>
            <div><RoleIcon color={isInvertedColor ? "white" : "black"} height={35}/></div>
          </Tooltip>
        </Link>
      )
    }
  }
  
  return (
    <div onClick={() => selectorCb()} className="me-1">
      {renderIcon()}
    </div>
  )
}
