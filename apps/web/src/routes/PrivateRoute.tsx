import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

import { useAppSelector } from 'puckee-common/redux'
import Loading from '../pages/Loading';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    // isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const {token, status } = useAppSelector((state) => state.auth)

    if(status === 'loading'){
        return <Loading/>;
    }
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                token ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;