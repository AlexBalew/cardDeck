import {Dispatch} from "redux";
import {AppThunkType} from "../../bll/store";
import {loginAPI, LoginResponseType, IUserData} from "../../api/login-api";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {setErrorAC, setErrorACType} from "../password/password-reducer";


export type UserDataType = {
    _id: string,
    email: null | string,
    name: string,
    avatar: string,
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
        case "profileReducer/SET_PROFILE_DATA": {
            return {
                ...state,
                _id: action.data._id,
                email: action.data.email,
                name: action.data.name,
                avatar: action.data.avatar ? action.data.avatar : '',
            }
        }
        default:
            return state
    }
}


export type setUserDataACType = ReturnType<typeof setUserData>
export type setProfileDataACType = ReturnType<typeof setProfileData>
type AllACType = setUserDataACType | setAppStatusACType | setErrorACType | setProfileDataACType

//* Action Creator ---------------------------------------------------------------->
export const setUserData = (data: UserDataType) => ({type: 'profileReducer/SET_USER_DATA', data} as const)
export const setProfileData = (data: LoginResponseType) => ({type: 'profileReducer/SET_PROFILE_DATA', data} as const )
//* Thunk Creator ---------------------------------------------------------------->
export const changeUserData = (userData: IUserData): AppThunkType => async (dispatch: Dispatch<AllACType>) => {
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

