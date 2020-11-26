/* eslint-disable import/no-anonymous-default-export */
import {
    LOAD_SIGNATURE,
    SAVE_SIGNATURE,
    DELETE_SIGNATURE,
    // SIGNATURE_ERROR,
} from "../actions/types";

const initialState = {
    hasSigned: false,
    signature: null,
    loading: true,
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_SIGNATURE:
        case LOAD_SIGNATURE:
            return {
                ...state,
                ...payload,
                hasSigned: true,
                loading: false,
            };
        case DELETE_SIGNATURE:
            return {
                ...state,
                hasSigned: false,
                signature: null,
                loading: false,
            };
        default:
            return state;
    }
}
