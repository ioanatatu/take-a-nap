import general from "./LoginRegisterForms.module.css";

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/auth";

// Components
import Alert from "../../components/main/Alert/Alert";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // const result = await axios.post("/api/auth", formData);
        login(email, password);
    };

    // Redirect if loged in

    if (isAuthenticated) {
        return <Redirect to="/signature" />;
    }

    return (
        <Fragment>
            <div className={general.Container}>
                <h1>login</h1>
                <div className={general.Home}>
                    <Link
                        to="/"
                        className={`${general.TextCursive} ${general.Hover}`}
                    >
                        home
                    </Link>
                </div>
                <p className={general.TextBlue}>
                    {" "}
                    Welcome back, fellow napper!
                </p>

                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className={general.Input}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className={general.Input}>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="login"
                        className={general.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                    />
                </form>
                <p className={general.Footer}>
                    Don't have an account?{" "}
                    <Link to="/register">
                        <span>Create one.</span>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);