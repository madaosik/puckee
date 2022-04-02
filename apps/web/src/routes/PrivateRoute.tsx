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
import { HeaderProps } from '../components/HeaderRow';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any
    // header: React.ReactNode
    content: React.ReactNode
    topBarType: TopBarType
    headerProps?: HeaderProps
    // isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, headerProps, content, topBarType, ...rest } = props;
    const {token, status } = useAppSelector((state) => state.auth)

    if(status === 'loading'){
        return <Loading/>;
    }

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                token ? (
                    <Component content={content} headerProps={headerProps} topBarType={topBarType} {...routeProps} />
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