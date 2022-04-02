import React from "react";
import { Auth, Main, NoMatch } from '../pages';
import { Dashboard, Games, Groups, Players, UserProfile, NewGame } from "../components";
import PrivateRoute from './PrivateRoute'
import {
    Switch,
    Route,
} from "react-router-dom";

import { TopBarType } from "../pages/Main";

const Routes = () => {
    return (
        <Switch>
            <Route exact path={['/sign-in', '/sign-up']}>
                <Auth/>
            </Route>
            {/* <Route exact path={['/signup']}>
                <SignUp />
            </Route> */}

            <PrivateRoute exact path={['/dashboard', '/']} component={Main} 
                content={<Dashboard/>} topBarType={TopBarType.Dashboard} />
            <PrivateRoute exact path="/games" component={Main}
                content={<Games/>} topBarType={TopBarType.Search}/>
            <PrivateRoute exact path="/games/new" component={Main}
                content={<NewGame/>} headerProps={{backPath: "/games", headerContent: "Nové utkání"}} topBarType={TopBarType.Standard}/>
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

