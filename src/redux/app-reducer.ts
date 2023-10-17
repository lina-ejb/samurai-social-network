import {getAuthUserData} from "./auth-reducer";


const initialState: InitialType = {
    error: null,
    initialized: false
}

export type InitialType = {
    error: null | string,
    initialized: boolean
}

export const appReducer = (state: InitialType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}

        }
        case 'APP/SET-INITIALIZED': {
            return {...state, initialized: true}
        }
        default:
            return state
    }
}
// types
type ActionType = SetAppErrorActionType | SetInitializedActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetInitializedActionType = ReturnType<typeof initializedSuccess>


// actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const initializedSuccess = () => ({type: 'APP/SET-INITIALIZED'} as const)


// thunks

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })



}


// export const initializeApp = () => async(dispatch: any) => {
//     await dispatch(getAuthUserData())
//     dispatch(initializedSuccess())
// }