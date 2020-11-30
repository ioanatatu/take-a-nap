import auth from "./LoginRegisterForms.module.css";

import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/auth";

// Components
import Alert from "../../components/main/Alert/Alert";

const Login = ({ login, isAuthenticated, alerts }) => {
    const [alertEmail, setAlertEmail] = useState([]);
    const [alertPass, setAlertPass] = useState([]);

    useEffect(() => {
        if (alerts != null && alerts.length > 0) {
            setAlertEmail(alerts.filter((alert) => alert.param === "email"));
            setAlertPass(alerts.filter((alert) => alert.param === "password"));
        }
    }, [alerts]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case "email":
                setAlertEmail([]);
                break;
            case "password":
                setAlertPass([]);
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // const result = await axios.post("/api/auth", formData);
        login(email, password);
    };

    // Redirect to signature if loged in
    if (isAuthenticated) {
        return <Redirect to="/signature" />;
    }

    return (
        <Fragment>
            <div className={auth.Container}>
                <h1>login</h1>
                <div className={auth.Home}>
                    <Link
                        to="/"
                        className={`${auth.TextCursive} ${auth.Hover}`}
                    >
                        home
                    </Link>
                </div>
                <p className={auth.TextBlue}> Welcome back, fellow napper!</p>

                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className={auth.Input}>
                        <span className={auth.AlertMsgWrapper}>
                            {alertEmail &&
                                alertEmail.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={auth.AlertMsg}
                                    >
                                        {alert.msg}
                                    </div>
                                ))}
                        </span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertEmail([])}
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
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            onClick={() => setAlertPass([])}
                        />
                    </div>
                    <input
                        type="submit"
                        value="login"
                        className={auth.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                    />
                </form>
                <p className={auth.Footer}>
                    Don't have an account?{" "}
                    <Link to="/register">
                        <span className={auth.Link}>Create one.</span>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    alerts: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
