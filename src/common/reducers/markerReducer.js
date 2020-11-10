import {
    SAVE_MARKER,
    PREPARE_NEW_MARKER,
    UNSELECT_NEW_MARKER,
    PREVIEW_EXISTING_MARKER,
    EXIT_PREVIEW
} from "../constants/action.js";
import LocalStorageRepository from '../../services/LocalStorageRepository.js';

const initialState = {
    markers: LocalStorageRepository.loadMarkers(),
    selectedMarker: {},
    isSelected: false,
    previewMarker: {},
    isViewed: false,
};

function markerReducer(state = initialState, action) {
    if (action.type === SAVE_MARKER) {
        let newState = Object.assign({}, state, {
            markers: state.markers.concat(action.payload)
        });
        LocalStorageRepository.overwriteMarkers(newState.markers);
        return newState;
    } else if (action.type === PREPARE_NEW_MARKER) {
        return Object.assign({}, state, {
            newMarkerPosition: action.payload,
            isBeingPrepared: true
        });
    } else if (action.type === UNSELECT_NEW_MARKER) {
        return Object.assign({}, state, {
            newMarkerPosition: {},
            isBeingPrepared: false
        });
    } else if (action.type === PREVIEW_EXISTING_MARKER) {
        console.log(action);
        return Object.assign({}, state, {
            previewMarker: action.payload,
            isViewed: true,
            newMarkerPosition: {},
            isBeingPrepared: false
        });
    } else if (action.type === EXIT_PREVIEW) {
        return Object.assign({}, state, {
            previewMarker: {},
            isViewed: false,
        });
    }
    return state;
}

export default markerReducer;