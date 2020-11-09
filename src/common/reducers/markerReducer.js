import {ADD_MARKER, SELECT_MARKER, UNSELECT_MARKER} from "../constants/action.js";

const initialState = {
    markers: [],
    selectedMarker: {},
    isSelected: false
};

function markerReducer(state = initialState, action) {
    if (action.type === ADD_MARKER) {
        return Object.assign({}, state, {
            markers: state.markers.concat(action.payload)
        });
    } else if (action.type === SELECT_MARKER) {
        return Object.assign({}, state, {
            selectedMarker: action.payload,
            isSelected: true
        });
    } else if (action.type === UNSELECT_MARKER) {
        return Object.assign({}, state, {
            isSelected: false
        });
    }
    return state;
}

export default markerReducer;