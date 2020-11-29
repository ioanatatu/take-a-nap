import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import css from "./Github.module.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const Github = ({ auth: { isAuthenticated } }) => {
    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <IconContext.Provider
            value={{
                color: "red",
            }}
        >
            <div className={css.Github}>
                <a
                    href="https://github.com/ioanatatu/take-a-nap"
                    target="_blank"
                    rel="noreferrer"
                    className={css.GithubLink}
                >
                    {!isAuthenticated && <p>see code on </p>}

                    <div className={css.GithubIcon}>
                        <FaGithub color="red" />
                    </div>
                </a>
            </div>
        </IconContext.Provider>
    );
};

Github.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(Github);
