import {Dispatch} from "redux";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {setErrorAC, setErrorACType} from "../password/password-reducer";
import {loginAPI} from "../../api/login-api";

type stateType = {
    isLoggedIn: boolean
}

let initState: stateType = {
    isLoggedIn: false
}

export const loginReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'login/SET_IS_LOGGED_IN' : {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state
    }
}

type AllACType = isLoggedInACType | setAppStatusACType | setErrorACType

type isLoggedInACType = ReturnType<typeof isLoggedInAC>

export const isLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_IS_LOGGED_IN',
        isLoggedIn
    } as const
}

export const logOutTC = () => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await loginAPI.logOut()
        dispatch(isLoggedInAC(false))
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