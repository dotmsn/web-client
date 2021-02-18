import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import LoadingPanel from "../layout/LoadingPanel"

// Relay
import { QueryRenderer } from "react-relay";
import { initEnvironment } from "../../relay/environment";

// GraphQL
import { currentUserQuery } from "../../graphql"

// Initialization
const environment = initEnvironment();

const ProtectedRoute = ({ Component, authenticated, ...componentProps }) => (
    <Route
        {...componentProps}
        render={(pageProps) =>
            authenticated ? (
                <QueryRenderer
                    environment={environment}
                    query={currentUserQuery}
                    render={({error, props}) => {
                        if (error) {
                            return <div>Error, {error.message}</div>;
                        }

                        if (!props) {
                            return <LoadingPanel/>;
                        }

                        if (!props.currentUser.confirmed)
                            return <Redirect to="/verify"/>
                        else
                            return <Component user={props.currentUser} {...pageProps} {...props} />
                    }}
                    />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: componentProps.location },
                    }}
                />
            )
        }
    />
);

const { object, bool, string, func } = PropTypes;

ProtectedRoute.propTypes = {
    Component: func.isRequired,
    exact: bool,
    path: string.isRequired,
    authenticated: bool.isRequired,
    location: object,
};

export default ProtectedRoute;
