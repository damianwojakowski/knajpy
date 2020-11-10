import {
    SAVE_MARKER,
    PREPARE_NEW_MARKER,
    UNSELECT_NEW_MARKER,
    PREVIEW_EXISTING_MARKER,
    EXIT_PREVIEW
} from "../constants/action.js";

export function saveMarker(payload) {
    return {type: SAVE_MARKER, payload};
}

export function prepareNewMarker(payload) {
    return {type: PREPARE_NEW_MARKER, payload};
}

export function unselectNewMarker() {
    return {type: UNSELECT_NEW_MARKER};
}

export function previewExistingMarker(payload) {
    return {type: PREVIEW_EXISTING_MARKER, payload};
}

export function exitPreview() {
    return {type: EXIT_PREVIEW};
}
