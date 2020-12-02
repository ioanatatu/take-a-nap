/* eslint-disable import/no-anonymous-default-export */
// a function that takes a piece of state and an action
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALERTS } from "../actions/types.js";

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        case REMOVE_ALERTS:
            return state.map((alert) => (alert = ""));
        default:
            return state;
    }
}
