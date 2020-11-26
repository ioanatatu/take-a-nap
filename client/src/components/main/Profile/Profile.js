// Styles
import cl from "./Profile.module.css";
import btn from "../../buttons.module.css";
import css from "../../auth/LoginRegisterForms.module.css";
import axios from "axios";

// React
import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";
import { saveProfile } from "../../../redux/actions/profile";
import { deleteSignature } from "../../../redux/actions/signature";
import { deleteProfile } from "../../../redux/actions/profile";
import { deleteAccount } from "../../../redux/actions/auth";
import { logout } from "../../../redux/actions/auth";
import PropTypes from "prop-types";

// Components
import Spinner from "../UI/Spinner/Spinner";
import Alert from "../Alert/Alert";

const Profile = ({
    loading,
    saveProfile,
    deleteSignature,
    deleteProfile,
    deleteAccount,
    logout,
    isAuthenticated,
    history,
    user,
    profile,
}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        console.log("profile from inside useEffect ", profile);

        if (profile) {
            setFormData({
                age: profile.age,
                city: profile.city,
                pet: profile.pet,
                url: profile.url,
            });
        }
    }, [isAuthenticated, profile]);

    const lastLocation = useLastLocation();

    const { age, city, pet, url } = formData;

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        saveProfile(age, city, pet, url);
        history.push("/signature");
    };

    const removeAccount = async () => {
        const res = await axios.delete("/api/users");

        console.log("res.data from removeAccount", res.data);

        if (res.data.accountDeleted) {
            logout();
            history.push("/register");
        } else {
            setAlert("Something went wrong.\nPlease try again");
            history.location.replace("/profile");
        }
    };

    return (
        <Fragment>
            {!lastLocation.pathname ? (
                <Spinner />
            ) : (
                <div className={cl.Profile}>
                    {!user ? (
                        <Spinner />
                    ) : (
                        <Fragment>
                            <header>
                                {lastLocation.pathname === "/register" ? (
                                    <div>
                                        <h2>
                                            Welcome,{" "}
                                            <span className={cl.User}>
                                                {user.first}
                                            </span>
                                        </h2>
                                        <h3 className={cl.TextBlue}>
                                            Tell us a few things about yourself
                                            before signing the petition
                                        </h3>
                                    </div>
                                ) : (
                                    <Fragment>
                                        <h1 className={cl.TextBlue}>
                                            Edit your profile
                                        </h1>
                                        <Alert />
                                    </Fragment>
                                )}
                            </header>
                            <form
                                className={cl.Form}
                                onSubmit={(e) => onSubmit(e)}
                            >
                                <div className={css.Input}>
                                    <input
                                        type="number"
                                        placeholder="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className={css.Input}>
                                    <input
                                        type="text"
                                        placeholder="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className={css.Input}>
                                    <input
                                        type="text"
                                        placeholder="pet"
                                        name="pet"
                                        value={formData.pet}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <div className={css.Input}>
                                    <input
                                        type="text"
                                        placeholder="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                                <span className={cl.ButtonsContainer}>
                                    <input
                                        type="submit"
                                        value="save"
                                        className={`${btn.BtnGeneral} ${btn.Btn2}`}
                                    />
                                    {lastLocation.pathname === "/register" ? (
                                        <Link to="/signature">
                                            <button
                                                className={`${btn.BtnGeneral} ${btn.Btn2}`}
                                            >
                                                skip for now
                                            </button>
                                        </Link>
                                    ) : null}
                                </span>
                            </form>

                            {lastLocation.pathname !== "/register" && (
                                <Fragment>
                                    <button
                                        onClick={removeAccount}
                                        className={`${btn.BtnGeneral} ${btn.Btn3} ${cl.BtnBottom}`}
                                    >
                                        delete account
                                    </button>
                                    <p className={cl.DeleteExplanation}>
                                        You can test the delete account
                                        functionality.
                                        <br />
                                        Once your account is deleted, you will
                                        be signed out and redirected to
                                        register.
                                    </p>
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    profile: state.profile.profile,
});

Profile.propTypes = {
    setAlert: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {
    setAlert,
    saveProfile,
    deleteSignature,
    deleteProfile,
    deleteAccount,
    logout,
})(Profile);
