// Styles
import css from "./RemoveAccount.module.css";
import btn from "../../buttons.module.css";
import cl from "../Profile/Profile.module.css";

// React
import React, { Fragment, useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";
import { logout } from "../../../redux/actions/auth";

// Components
import Spinner from "../UI/Spinner/Spinner";
// import Alert from "../Alert/Alert";

const RemoveAccount = ({ showModalGeneralHandler, logout }) => {
    let history = useHistory();
    const [accountRemoved, setAccountRemoved] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log("history", history);

    useEffect(() => {
        console.log(">>>>>>>>>>>> remove account mounted");

        return () => console.log("++++++++++ UNMOUNTED");
    }, []);

    const removeAccount = async () => {
        setLoading(true);
        setAccountRemoved(false);

        const res = await axios.delete("/api/users");

        console.log("res.data from removeAccount", res.data);

        if (res.data.accountDeleted) {
            if (localStorage.getItem("showModalOnLoad")) {
                localStorage.removeItem("showModalOnLoad");
            }
            // 3. confirm account removal inside modal
            setTimeout(() => {
                setAccountRemoved(true);
            }, 1000);
            // 4. redirect to register page
            logout();
            history.push("/register");
            setTimeout(() => {
                showModalGeneralHandler(false);
            }, 3000);
        } else {
            setAlert("Something went wrong.\nPlease try again");
            history.location.replace("/profile");
        }
    };

    return (
        <div className={css.RemoveAccountWrapper}>
            {!accountRemoved && !loading ? (
                <Fragment>
                    <h2 style={{ marginBottom: 20 }}>
                        Are you sure you want to delete your account?
                    </h2>
                    <div>
                        <button
                            className={`${btn.BtnGeneral} ${btn.Btn2}`}
                            onClick={() => showModalGeneralHandler(false)}
                        >
                            No, back to profile
                        </button>
                        <button
                            onClick={removeAccount}
                            className={`${btn.BtnGeneral} ${btn.Btn3} ${cl.BtnBottom}`}
                        >
                            Yes, delete account
                        </button>
                    </div>
                </Fragment>
            ) : !accountRemoved && loading ? (
                <Spinner size={150} />
            ) : (
                <Fragment>
                    <h3 style={{ marginBottom: 20 }}>
                        Your account has been deleted
                    </h3>
                    <h4>Sorry to see you leave</h4>
                </Fragment>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

RemoveAccount.propTypes = {
    isAuthenticated: PropTypes.bool,
    setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    logout,
    setAlert,
})(RemoveAccount);
