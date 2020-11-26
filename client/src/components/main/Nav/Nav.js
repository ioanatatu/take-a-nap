import css from "./Nav.module.css";

import React from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../redux/actions/auth";

const Nav = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    return (
        <header className={css.Toolbar}>
            <div>
                <Link to="/" className={css.Logo}>
                    nap.
                </Link>
            </div>
            <nav className={css.Nav}>
                <Link to="/signature">signature</Link>
                <Link to="/profile">profile</Link>
                <Link to="/nappers">nappers</Link>
                <span className={css.Logout} onClick={logout}>
                    logout
                </span>
                <div className={css.Avatar}>
                    <img src={`${user && user.avatar}`} alt="avatar"></img>
                </div>
            </nav>
        </header>
    );
};

Nav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);

// <header className={classes.Toolbar}>
//     <DrawerToggle clicked={props.drawerToggleClicked} />
//     <div className={classes.Logo}>
//         <Logo />
//     </div>
//     <nav className={classes.DesktopOnly}>
//         <NavigationItems />
//     </nav>
// </header>;
