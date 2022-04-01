import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

// import { Component } from 'react';
import { useAppSelector } from 'puckee-common/redux'
import Loading from '../pages/Loading';
import { resetCustomConfigPaths } from '../../node_modulesOLD/@expo/config/build';
import { TopBarType } from "../pages/Main";


interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any
    content: React.ReactNode
    topBarType: TopBarType
    // isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, content, topBarType, ...rest } = props;
    const {token, status } = useAppSelector((state) => state.auth)

    if(status === 'loading'){
        return <Loading/>;
    }
    // console.log(routeProps)
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                token ? (
                    <Component content={content} topBarType={topBarType} {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/sign-in',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;