type stateType = {}

let initState: stateType = {}


export const registrationReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case '' : {
            return {...state}
        }
        default:
            return state
    }
}

type AllACType = firstACType

type firstACType = ReturnType<typeof firstAC>

export const firstAC = () => {
    return {
        type: ''
    } as const
}