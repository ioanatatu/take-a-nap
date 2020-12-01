// style
import css from "./Nappers.module.css";
import btn from "../../buttons.module.css";

// modules
import axios from "axios";

// React
import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Spinner from "../UI/Spinner/Spinner";

const Nappers = ({ isAuthenticated, hasSigned, userId }) => {
    console.log("hasSigned from Nappers", hasSigned);
    const [nappers, setNappers] = useState([]);

    const notSigned = (
        <span style={{ textAlign: "center" }}>
            <div className={css.TextBlue}>
                Sign first to check out all our supporters
            </div>
            <Link to="/signature" className={`${btn.BtnGeneral} ${btn.Btn2}`}>
                go to signature
            </Link>
        </span>
    );

    useEffect(() => {
        (async function () {
            const res = await axios.get("/api/signature/all");

            setNappers(res.data.filter((el) => el.id !== userId));

            console.log("all signers", res.data);
        })();
    }, [hasSigned, userId]);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Fragment>
            <div className={css.Nappers}>
                {hasSigned ? (
                    <Fragment>
                        <h1 className={css.TextBlue}>Our supporters</h1>
                        <div className={css.NappersWrapper}>
                            <ul className={css.Row}>
                                <li style={{ textAlign: "left" }}>name</li>
                                <li>age</li>
                                <li>city</li>
                                <li>pet</li>
                                <li>url</li>
                            </ul>
                            {!nappers ? (
                                <Spinner />
                            ) : nappers.length === 0 ? (
                                <div style={{ marginTop: "30px" }}>
                                    Looks like there are no other signers at the
                                    moment.
                                </div>
                            ) : (
                                mapNappersToList(nappers, userId)
                            )}
                        </div>

                        <Link
                            to="/"
                            style={{
                                fontFamily: "Recoleta",
                                textDecoration: "none",
                                marginTop: "30px",
                            }}
                        >
                            back home
                        </Link>
                    </Fragment>
                ) : (
                    <Fragment>{notSigned}</Fragment>
                )}
            </div>
        </Fragment>
    );
};

Nappers.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    hasSigned: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user.id,
    hasSigned: state.signature.hasSigned,
});

export default connect(mapStateToProps, {})(Nappers);
/*
 *
 *
 *
 *
 *
 * helper functions
 */
const mapNappersToList = (array) => {
    return array.map((el, index) => {
        return (
            <ul
                className={css.RowNappers}
                key={index.toString()}
                style={{
                    backgroundColor: `${index % 2 !== 0 ? "#d7c5ff2f" : null}`,
                }}
            >
                <li
                    style={{ textAlign: "left" }}
                >{`${el.first} ${el.last}`}</li>
                <li>{el.age}</li>
                <li>{el.city}</li>
                <li>{el.pet}</li>
                <a
                    href={el.url}
                    target="_blank"
                    rel="noreferrer"
                    className={css.Url}
                >
                    {el.url}
                </a>
            </ul>
        );
    });
};
