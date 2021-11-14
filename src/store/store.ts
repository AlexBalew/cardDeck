import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {firstReducer} from "../reducers/firstReducer";
import {restorePassReducer} from "../reducers/restorePassReducer";

export type AppStateType = ReturnType<typeof appState>

const appState = combineReducers({
    first: firstReducer,
    restorePass: restorePassReducer
})

export let store = createStore(appState, applyMiddleware(thunk))