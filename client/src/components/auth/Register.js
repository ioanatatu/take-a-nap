import general from "./LoginRegisterForms.module.css";

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/auth";
import PropTypes from "prop-types";

// Components
import Alert from "../../components/main/Alert/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        password2: "",
    });

    const { first, last, email, password, password2 } = formData;

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            console.log("passwords do not match");
            setAlert("Passwords do not match", "danger");
        } else {
            register(first, last, email, password, password2);
        }
    };

    if (isAuthenticated) {
        console.log("@@@@@___ this is redirecting me to profile");
        return <Redirect to="/profile" />;
    }

    return (
        <Fragment>
            <div className={general.Container}>
                <h1>register</h1>
                <div className={general.Home}>
                    <Link
                        className={`${general.TextCursive} ${general.Hover}`}
                        to="/"
                    >
                        home
                    </Link>
                </div>

                <p className={general.TextBlue}>Create Your Account</p>

                <form className={general.Form} onSubmit={(e) => onSubmit(e)}>
                    <div className={general.Input}>
                        <input
                            type="text"
                            placeholder="first name"
                            name="first"
                            // value={first}
                            onChange={(e) => onChange(e)}
                            // required
                        />
                    </div>
                    <div className={general.Input}>
                        <input
                            type="text"
                            placeholder="last name"
                            name="last"
                            // value={last}
                            onChange={(e) => onChange(e)}
                            // required
                        />
                    </div>
                    <div className={general.Input}>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            // value={email}
                            onChange={(e) => onChange(e)}
                            // required
                        />
                    </div>
                    <div className={general.Input}>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            // value={password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            // required
                        />
                    </div>
                    <div className={general.Input}>
                        <input
                            type="password"
                            placeholder="confirm password"
                            name="password2"
                            // value={password2}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            // required
                        />
                    </div>
                    <input
                        type="submit"
                        className={general.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                        value="register"
                    />
                </form>

                <p className={general.Footer}>
                    Already have an account?{" "}
                    <Link to="/login">
                        <span>Sign in.</span>
                    </Link>
                </p>
            </div>
            <Alert />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
