import { ADD_MARKER, SELECT_MARKER } from "../constants/action.js";

const initialState = {
    markers: [],
    selected: {}
};

function addMarkerReducer(state = initialState, action) {
    if (action.type === ADD_MARKER) {
        return Object.assign({}, state, {
            markers: state.markers.concat(action.payload)
        });
    } else if (action.type === SELECT_MARKER) {
        return Object.assign({}, state, {
            selected: action.payload
        });
    }
    return state;
}

export default addMarkerReducer;