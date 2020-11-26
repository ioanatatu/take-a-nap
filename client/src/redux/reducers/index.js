import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import signature from "./signature";

export default combineReducers({
    alert,
    auth,
    profile,
    signature,
});
