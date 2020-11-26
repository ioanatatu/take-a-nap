import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";
import { logoutProfile } from "./profile";
import { logoutSignature } from "./signature";
import { loadProfile } from "../actions/profile";
import { loadSignature } from "../actions/signature";

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/auth");
        console.log("res.data from actions/auth/loadUser ", res.data);

        dispatch({
            type: LOAD_USER,
            payload: res.data,
        });
    } catch (err) {
        console.log("err from actions/auth", err);
        dispatch({ type: AUTH_ERROR });
    }
};
/*
 *
 *
 *
 */
// Register User
export const register = (first, last, email, password, password2) => async (
    dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ first, last, email, password, password2 });

    try {
        const res = await axios.post("/api/users", body, config);
        console.log("token after registration", res.data);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        console.log("~~> err from auth.js/actions ", err.response.data.errors);

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};
/*
 *
 *
 *
 */
// Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth", body, config);
        console.log(res.data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
        dispatch(loadProfile());
        dispatch(loadSignature());
    } catch (err) {
        console.log(
            "~~> err from /actions/auth.js/login ",
            err.response.data.errors
        );

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
/*
 *
 *
 *
 */
// Logout User
export const logout = () => (dispatch) => {
    console.log("###### inside auth logout");
    dispatch(logoutSignature());
    dispatch(logoutProfile());
    dispatch({ type: LOGOUT });
};
/*
 *
 *
 *
 */
// DELETE User Account --------> not in use ----------
export const deleteAccount = () => async (dispatch) => {
    try {
        await axios.delete("/api/auth");
        dispatch({ type: DELETE_ACCOUNT });
    } catch (err) {
        console.log(err);
    }
};
