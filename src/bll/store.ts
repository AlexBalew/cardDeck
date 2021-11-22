import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {restorePassReducer} from "../features/password/password-reducer";
import {loginReducer} from "../features/login/login-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {registrationReducer} from "../features/registration/registration-reducer";
import {appReducer} from "../app/app-reducer";
import {cardPacksReducer} from "../features/cardPacks/cardPacks-reducer";


const rootReducer = combineReducers({
    password: restorePassReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,
    packs: cardPacksReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>


//* Common actions type
export type AppActionsType = any

//* Common thunk type
export type AppThunkType<A extends Action = AppActionsType, R = void> = ThunkAction<R, AppStateType, unknown, A>



//@ts-ignore
window.store = store