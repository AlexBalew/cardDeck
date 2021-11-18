import {AppStateType} from "../../bll/store";
import {ThunkDispatch} from "redux-thunk";
import {registApi} from "../../api/registration-api";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";

type InitStateType = typeof initState;

const initState = {
    isRegistry: false,
    backError: ''
};


export const registrationReducer = (state = initState, action: AllACType): InitStateType => {
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
type AllACType =
    | ReturnType<typeof registrated>
    | ReturnType<typeof setErrorAC>
    | setAppStatusACType

const registrated = () => ({type: 'registry/REGISTRATED'} as const)
export const setErrorAC = (error: string) => ({type: 'registry/BACKEND-ERROR', error} as const)


export const registryTC = (email: string, password: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await registApi.register(email, password)
        dispatch(registrated())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("succeeded"))
    }
}