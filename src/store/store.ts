import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {firstReducer} from "../reducers/firstReducer";

const appState = combineReducers({
    first: firstReducer
})

export let store = createStore(appState, applyMiddleware(thunk))