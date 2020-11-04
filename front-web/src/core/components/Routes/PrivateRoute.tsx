import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAllowedByRole, isAuthenticated, Role } from 'core/utils/auth';

type Props = {
    children: React.ReactNode;
    path: string;
    allowedRoutes?: Role[];
}

const PrivateRoute = ({ children, path, allowedRoutes }: Props) => {
    
    return (
      <Route
        path={path}
        render={({ location }) => {
          if (!isAuthenticated()) {
            return (
              <Redirect
                to={{
                  pathname: "/admin/auth/login",
                  state: { from: location }
                }}
              />
            )
          } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)) {
            return (
              <Redirect to={{ pathname: "/admin" }} />
            )
          }
          return children;
        }}
      />
    );
}

export default PrivateRoute;