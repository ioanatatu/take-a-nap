import auth from "./LoginRegisterForms.module.css";

import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import { register } from "../../redux/actions/auth";
import PropTypes from "prop-types";

// Components
// import Alert from "../../components/main/Alert/Alert";

const Register = ({ setAlert, register, isAuthenticated, alerts }) => {
    const [alertFirst, setAlertFirst] = useState([]);
    const [alertLast, setAlertLast] = useState([]);
    const [alertEmail, setAlertEmail] = useState([]);
    const [alertPass, setAlertPass] = useState([]);
    const [alertPass2, setAlertPass2] = useState([]);

    useEffect(() => {
        alerts != null && alerts.length > 0 && console.log(alerts);
        if (alerts != null && alerts.length > 0) {
            setAlertFirst(alerts.filter((alert) => alert.param === "first"));
            setAlertLast(alerts.filter((alert) => alert.param === "last"));
            setAlertEmail(alerts.filter((alert) => alert.param === "email"));
            setAlertPass(alerts.filter((alert) => alert.param === "password"));
            setAlertPass2(
                alerts.filter((alert) => alert.param === "password2")
            );
        }
    }, [alerts]);

    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        password2: "",
    });

    const { first, last, email, password, password2 } = formData;

    const onChange = (e) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case "first":
                setAlertFirst([]);
                break;
            case "last":
                setAlertLast([]);
                break;
            case "email":
                setAlertEmail([]);
                break;
            case "password":
                setAlertPass([]);
                break;
            case "password2":
                setAlertPass2([]);
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            console.log("passwords do not match");
            setAlert("Passwords do not match", "password2", "danger");
        } else {
            register(first, last, email, password, password2);
        }
    };

    // Redirect to Profile after registration
    if (isAuthenticated) {
        return <Redirect to="/profile" />;
    }

    return (
        <Fragment>
            <div className={auth.Container}>
                {/*<Alert className={auth.Alert} />*/}
                <h1>register</h1>
                <div className={auth.Home}>
                    <Link
                        className={`${auth.TextCursive} ${auth.Hover}`}
                        to="/"
                    >
                        home
                    </Link>
                </div>

                <p className={auth.TextBlue}>Create Your Account</p>

                <form className={auth.Form} onSubmit={(e) => onSubmit(e)}>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertFirst &&
                                alertFirst.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={auth.AlertMsg}
                                    >
                                        {alert.msg}
                                    </div>
                                ))}
                        </span>
                        <input
                            type="text"
                            placeholder="first name"
                            name="first"
                            // value={first}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertFirst([])}
                            // required
                        />
                    </div>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertLast.map((alert) => (
                                <div key={alert.id} className={auth.AlertMsg}>
                                    {alert.msg}
                                </div>
                            ))}
                        </span>
                        <input
                            type="text"
                            placeholder="last name"
                            name="last"
                            // value={last}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertLast([])}
                            // required
                        />
                    </div>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertEmail.map((alert) => (
                                <div key={alert.id} className={auth.AlertMsg}>
                                    {alert.msg}
                                </div>
                            ))}
                        </span>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            // value={email}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertEmail([])}
                            // required
                        />
                    </div>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertPass.map((alert) => (
                                <div key={alert.id} className={auth.AlertMsg}>
                                    {alert.msg}
                                </div>
                            ))}
                        </span>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            // value={password}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertPass([])}
                            // minLength="6"
                            // required
                        />
                    </div>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertPass2.map((alert) => (
                                <div key={alert.id} className={auth.AlertMsg}>
                                    {alert.msg}
                                </div>
                            ))}
                        </span>
                        <input
                            type="password"
                            placeholder="confirm password"
                            name="password2"
                            // value={password2}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertPass2([])}
                            // minLength="6"
                            // required
                        />
                    </div>
                    <input
                        type="submit"
                        className={auth.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                        value="register"
                    />
                </form>

                <p className={auth.Footer}>
                    Already have an account?{" "}
                    <Link to="/login">
                        <span className={auth.Link}>Sign in.</span>
                    </Link>
                </p>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts: state.alert,
});

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    alerts: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
