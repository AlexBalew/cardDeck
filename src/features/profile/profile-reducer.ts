import {Dispatch} from "redux";
import {AppThunkType} from "../../bll/store";
import {loginAPI, UserData} from "../../api/login-api";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {setErrorAC, setErrorACType} from "../password/password-reducer";
import {Nullable} from "../../types";


export type UserDataType = {
    _id: string,
    email: Nullable<string>,
    name: Nullable<string>,
    avatar?: string,
}

const initState = {
    _id: '',
    email: null,
    name: '',
    avatar: '',
}

export const profileReducer = (state: UserDataType = initState, action: AllACType): UserDataType => {
    switch (action.type) {
        case 'profileReducer/SET_USER_DATA' :
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export type setUserDataACType = ReturnType<typeof setUserData>
type AllACType = setUserDataACType | setAppStatusACType | setErrorACType

//* Action Creator ---------------------------------------------------------------->
export const setUserData = (data: UserDataType) => ({type: 'profileReducer/SET_USER_DATA', data} as const)


//* Thunk Creator ---------------------------------------------------------------->
export const changeUserData = (userData: UserData): AppThunkType => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await loginAPI.changeData(userData)
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setUserData(response.data.updatedUser))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("succeeded"))
    }
}

