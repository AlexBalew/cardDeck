import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {restorePassReducer} from "../features/password/password-reducer";
import {loginReducer} from "../features/login/login-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {registrationReducer} from "../features/registration/registration-reducer";
import {appReducer} from "../app/app-reducer";
import {cardsReducer} from "../features/cards/cards-reducer";
import {cardPacksReducer} from "../features/cardPacks/cardPacks-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
    password: restorePassReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,
    cards: cardsReducer,
    packs: cardPacksReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

//* Common thunk type
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

//@ts-ignore
window.store = store