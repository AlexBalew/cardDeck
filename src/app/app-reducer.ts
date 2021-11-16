
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
}

const initialState: InitialStateType = {
    status: 'idle',
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export type ActionsType = setAppStatusACType
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        status
    } as const
}