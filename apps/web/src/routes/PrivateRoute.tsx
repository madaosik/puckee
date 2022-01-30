// import React from "react";
// import { useAppSelector } from "../app/store"
// import Loading from '../pages/Loading';

// import {
//     Route,
//     Redirect,
//     RouteProps
// } from "react-router-dom";


// interface PrivateRouteProps extends RouteProps {
//     // tslint:disable-next-line:no-any
//     component?: any
//     // tslint:disable-next-line:no-any
//     children?: any
// }


// const PrivateRoute = (props: PrivateRouteProps) => {
//     const { component: Component, children, ...rest } = props
//     const {token, status } = useAppSelector((state) => state.auth)
//     console.log(token)
//     console.log(status)
//     console.log("jsem v privatni zone")
//     if(status === 'loading'){
//         return <Loading/>;
//     }

//     return (
//       <Route
//         {...rest}
//         render={routeProps =>
//           token ? (
//             Component ? (
//               <Component {...routeProps} />
//             ) : (
//               children
//             )
//           ) : (
//             <Redirect
//               to={{
//                 pathname: '/login',
//                 state: { from: routeProps.location },
//               }}
//             />
//           )
//         }
//       />
//     );
//   };

// export default PrivateRoute;

import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

import { useAppSelector } from "../app/store"
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