/* eslint-disable import/no-anonymous-default-export */
import { LOAD_PROFILE, DELETE_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = { profile: null, loading: true };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_PROFILE:
            console.log("profile from reducers/profile ", state.profile);
            console.log("profile from reducers/profile/payload ", payload);
            return {
                ...state,
                profile: { ...payload },
                loading: false,
            };
        case DELETE_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
            };
        default:
            return state;
    }
}
