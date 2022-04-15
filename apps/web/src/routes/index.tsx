import React, { useState } from "react";
import { Auth, Main, NoMatch } from '../pages';
import { Dashboard, Games, Groups, Players, UserProfile, NewGame } from "../components";
import PrivateRoute from './PrivateRoute'
import {
    Switch,
    Route,
} from "react-router-dom";

import { TopBarType } from "../pages/Main";
import LoginForm from "../components/Auth/LoginForm";
import SignUpForm from "../components/Auth/SignUpForm";
import SignUpDetailsForm from "../components/Auth/SignUpDetailsForm";

const Routes = () => {
    const [headerContent, setHeaderContent] = useState<JSX.Element>(<></>)

    const newGameHeaderCb = (element: JSX.Element) => {
        setHeaderContent(element)
    }

    return (
        <Switch>
            <Route exact path={['/sign-in']}>
                <Auth content={<LoginForm/>}/>
            </Route>
            <Route exact path={['/sign-up']}>
                <Auth content={<SignUpForm/>}/>
            </Route>

            <PrivateRoute exact path={['/sign-up-details']} component={Auth} content={<SignUpDetailsForm/>}/>
            <PrivateRoute exact path={['/dashboard', '/']} component={Main} 
                content={<Dashboard/>} topBarType={TopBarType.Dashboard} />
            <PrivateRoute exact path="/games" component={Main}
                content={<Games/>} topBarType={TopBarType.Search}/>
            <PrivateRoute exact path="/games/new" component={Main}
                content={<NewGame gameTitleCb={newGameHeaderCb} />} headerProps={{backPath: "/games", headerContent: headerContent}} topBarType={TopBarType.Standard}/>
            <PrivateRoute exact path="/players" component={Main}
                content={<Players/>} topBarType={TopBarType.Search}/>
            <PrivateRoute exact path="/profile" component={Main}
                content={<UserProfile/>} topBarType={TopBarType.Standard}/>
            <PrivateRoute exact path="/groups" component={Main}
                content={<Groups/>} topBarType={TopBarType.Standard}/>
                {/* <Games/> */}
            {/* </PrivateRoute> */}

            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
)}

export default Routes;

