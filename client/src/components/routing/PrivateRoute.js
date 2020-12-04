import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated ? (
                    <Fragment>
                        <Redirect to="/" />
                    </Fragment>
                ) : (
                    <Component {...props} {...rest} />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
