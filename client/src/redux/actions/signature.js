import axios from "axios";
import {
    LOAD_SIGNATURE,
    SAVE_SIGNATURE,
    DELETE_SIGNATURE,
    SIGNATURE_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

// Load Signature
export const loadSignature = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/signature");
        console.log("res.data from actions/signature/loadSignature ", res.data);

        dispatch({
            type: LOAD_SIGNATURE,
            payload: res.data,
        });
    } catch (err) {
        console.log("err from actions/auth", err);
        dispatch({ type: SIGNATURE_ERROR });
    }
};
/*
 *
 *
 *
 */
// Save Signature
export const saveSignature = (signature) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ signature });

    try {
        const res = await axios.post("/api/signature", body, config);

        dispatch({
            type: SAVE_SIGNATURE,
            payload: res.data,
        });
    } catch (err) {
        console.log("err from actions/signature", err);
        dispatch({ type: SIGNATURE_ERROR });
    }
};
/*
 *
 *
 *
 */
// DELETE Signature
export const deleteSignature = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        await axios.delete("/api/signature");

        dispatch({
            type: DELETE_SIGNATURE,
        });
    } catch (err) {
        console.log("err from actions/auth", err);
        dispatch({ type: SIGNATURE_ERROR });
    }
};
/*
 *
 *
 *
 */
// Logout Signature
export const logoutSignature = () => async (dispatch) => {
    console.log("°°°°°°°°°°°°°°°°° inside logout Signature");
    dispatch({ type: DELETE_SIGNATURE });
};
