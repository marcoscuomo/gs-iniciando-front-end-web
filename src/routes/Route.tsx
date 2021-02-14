import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReacDOMtRouterProps, Redirect } from 'react-router-dom';
import { boolean } from 'yup/lib/locale';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReacDOMtRouterProps {
    isPrivate?: boolean;
    component: React.ComponentType
}

// 1. rota privada (true)  / usuario autenticado (true) = OK
// 2. Rota privada (true)  / usuario autenticado (false) = Reirecionar para login
// 3. Rota privada (false) / usuario autenticado (true) = Redirecionar para dashboard
// 4. Rota privada (false) / usuario autenticado (false) = OK

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {

    const { user } = useAuth();

    return (
        <ReactDOMRoute 
            {...rest} 
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect to={{ 
                        pathname: isPrivate ? '/' : '/dashboard',
                        state: { from: location },
                    }} />
                )
            }} 
        />
    );

};

export default Route;