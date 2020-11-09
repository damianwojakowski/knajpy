import { ADD_MARKER, SELECT_MARKER } from "../constants/action.js";

export function addMarker(payload) {
    return { type: ADD_MARKER, payload };
}

export function selectMarker(payload) {
    return { type: SELECT_MARKER, payload };
}
