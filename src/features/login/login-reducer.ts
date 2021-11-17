import { AppThunkType} from "../../bll/store";
import {loginApi} from "../../api/login-api";
import { setIsFetching, setIsInitialized} from "../../app/app-reducer";
import {setUserData} from "../profile/profile-reducer";




//* Type ----------------------------------------------------------------------->
export type LoginStateType = typeof initState

export type LoginReducerActionsType = ReturnType<typeof setIsAuth> | ReturnType<typeof logInAC>
export type LoginReducerThunkType = AppThunkType<LoginReducerActionsType>


//* Initial state --------------------------------------------------------------->

const initState = {
    isAuthorized: false
}

export const loginReducer = (state:LoginStateType = initState, action: LoginReducerActionsType): LoginStateType => {
    switch (action.type) {
        case 'login-reducer/SET_IS_AUTH' : {
            return {...state, isAuthorized: action.isAuthorized}
        }
        default:
            return state
    }
}


//* Action creators --------------------------------------------------------------->
export const setIsAuth = (isAuthorized: boolean) => ({ type: 'login-reducer/SET_IS_AUTH', isAuthorized} as const)
export const logInAC = (email: string, password: string, isAuthorized: boolean) => ({type: 'login-reducer/SET_IS_AUTH', email, password, isAuthorized} as const)
export const logOutAC = (isAuthorized: boolean) => ({type: 'login-reducer/SET_IS_AUTH', isAuthorized} as const)



//* Thunk creators --------------------------------------------------------------->
export const loginThunk = (email: string, password: string, rememberMe: boolean, isAuthorized: boolean): AppThunkType => dispatch => {
    dispatch(setIsFetching(true))
    loginApi.login(email, password, rememberMe)
        .then((res) => {
            dispatch(setIsFetching(false))
            dispatch(logInAC(res.data.email, res.data.name, true))
        }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        })
}

export const authThunk = (): AppThunkType => dispatch => {
    dispatch(setIsFetching(true))
    loginApi.authMe()
        .then((res) => {
            let {email, _id, name, avatar, publicCardPacksCount} = res.data
            dispatch(setIsFetching(false))
            dispatch(setIsInitialized(true))
            dispatch(setIsAuth(true))
            dispatch(setUserData({email, _id, name, avatar, publicCardPacksCount}))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
}

export const logoutThunk = (): AppThunkType => dispatch => {
    dispatch(setIsFetching(true))
    loginApi.logOut()
        .then(res => {
            if (res.status === 200) {
                dispatch(setIsFetching(false))
                dispatch(setIsAuth(false))
                dispatch(setUserData( {_id: '', email: null, name: '', avatar: '', publicCardPacksCount: null}))
            }
        })
        .catch( (e)=> {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
}



