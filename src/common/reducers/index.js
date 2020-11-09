import {combineReducers} from 'redux';
import markerReducer from './markerReducer.js';

const rootReducer = combineReducers({
    markers: markerReducer
});

export default rootReducer;