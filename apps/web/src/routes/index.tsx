import React from "react";
import { Login, Games, NoMatch, Profile, SignUp } from '../pages';
import PrivateRoute from './PrivateRoute'
import {
    Switch,
    Route,
} from "react-router-dom";

const Routes = () => {
    return (
    <Switch>
        <Route exact path={['/login', '/']}>
            <Login />
        </Route>
        <Route exact path={['/signup']}>
            <SignUp />
        </Route>

        <PrivateRoute exact path="/home" component={Games}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
            {/* <Games/> */}
        {/* </PrivateRoute> */}

        <Route path="*">
            <NoMatch />
          </Route>
    </Switch>
)}

export default Routes;

