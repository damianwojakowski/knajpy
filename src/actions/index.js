import { ADD_MARKER } from "../constants/action.js";

export function addMarker(payload) {
    return { type: ADD_MARKER, payload };
}