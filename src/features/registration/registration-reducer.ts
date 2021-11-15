import {AppStateType} from "../../bll/store";
import {ThunkDispatch} from "redux-thunk";
import {registApi} from "../../api/registration-api";

type InitStateType = typeof initState;

const initState = {
    isRegistry: false,
    backError: ''
};


export const registrationReducer = (state = initState, action: actionsTypes): InitStateType => {
    switch (action.type) {
        case 'registry/REGISTRATED':
            return {...state, isRegistry: true}
        case 'registry/BACKEND-ERROR':
            return {...state, backError: action.error}
        default:
            return state
    }
}

// AC
type actionsTypes =
    | ReturnType<typeof registrated>
    | ReturnType<typeof setError>

const registrated = () => ({type: 'registry/REGISTRATED'} as const)
const setError = (error: string) => ({type: 'registry/BACKEND-ERROR', error } as const)


export const registryTC = (email: string, password: string) => (dispatch: ThunkDispatch<AppStateType, unknown, actionsTypes>) => {
    registApi.register(email, password)
        .then((res) => {
            if (res.data) {dispatch(registrated())}
        })
        .catch(e => {
            dispatch(setError(e.response.data.error))
        })
}