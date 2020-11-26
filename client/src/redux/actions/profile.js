import axios from "axios";
import { LOAD_PROFILE, DELETE_PROFILE, PROFILE_ERROR } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

// Load Profile
export const loadProfile = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/profile");
        console.log("res.data from actions/profile/loadProfile ", res.data);

        dispatch({
            type: LOAD_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.log("err from actions/auth", err);
        dispatch({ type: PROFILE_ERROR });
    }
};
/*
 *
 *
 *
 */
// Save User Profile
export const saveProfile = (age, city, pet, url) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ age, city, pet, url });

    try {
        const res = await axios.post("/api/profile", body, config);
        console.log("example", res.data);
        const profile = res.data;

        dispatch({
            type: LOAD_PROFILE,
            payload: { ...profile },
        });
    } catch (err) {
        console.log("err from actions/auth", err);
        dispatch({ type: PROFILE_ERROR });
    }
};
/*
 *
 *
 *
 */
// DELETE User Profile
export const deleteProfile = () => async (dispatch) => {
    try {
        await axios.delete("/api/profile");
        dispatch({ type: DELETE_PROFILE });
    } catch (err) {
        console.log("err from actions/profile", err);
        dispatch({ type: PROFILE_ERROR });
    }
};
/*
 *
 *
 *
 */
// Logout User Profile
export const logoutProfile = () => async (dispatch) => {
    dispatch({ type: DELETE_PROFILE });
};
