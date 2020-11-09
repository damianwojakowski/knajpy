import { ADD_MARKER } from "../constants/action.js";

const initialState = {
    markers: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_MARKER) {
        return Object.assign({}, state, {
            markers: state.markers.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;