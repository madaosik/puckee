import React from "react"
import { CSSProperties } from "react"
import { Link } from "react-router-dom"
import { GamesList } from "../features/games/GamesList"
// import { useAppDispatch } from "../app/store"
// import { Button } from "../components"
// import { signOut } from "../features/auth/authSlice"
import { VerticalMenu } from '../components'
import { Header, HeaderProps } from "../components/HeaderRow"

export enum TopBarType {
    Standard,
    Search,
    Dashboard
}

interface MainWindowProps {
    headerProps?: HeaderProps
    content: JSX.Element,
    topBarType: TopBarType
}

const Main = ( {headerProps, content, topBarType}: MainWindowProps) => {
    var topBarStyle: string
    var mainAppStyle: string
    if (topBarType == TopBarType.Standard) {
        topBarStyle = "topBar std"
        mainAppStyle = "main-app std"
    } else if (topBarType == TopBarType.Search) {
        topBarStyle = "topBar search"
        mainAppStyle = "main-app search"
    } else {
        topBarStyle = "topBar dashboard"
        mainAppStyle = "main-app dashboard"
    }

    return  (
        <>
            <div className={topBarStyle}></div>
            <div className="container-xxl">
                <div className={mainAppStyle}>
                    <Header {...headerProps}/>
                    <VerticalMenu/>
                    {/* <GamesList/> */}
                    <div className="main-content">
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}

// const topBarStyleFn = (topBarHeight?: number) : CSSProperties => {
//     return (
//         {
//             backgroundColor: 'var(--app-color-darkest)',
//             position: 'fixed',
//             top: 0,
//             width: '100%',
//             height: topBarHeight ? topBarHeight + 'px' : 'var(--top-bar-std-height)',
//             zIndex: '0',
//         }
//     )
// }

// const styles = {
//     brand: {
//         marginBottom: '5px',
//         marginLeft: '0.5rem',
//         // marginRight: '1rem'
//     },
//     topBar: topBarStyle
// }



export default Main