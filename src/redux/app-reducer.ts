import {authAPI} from "../api/api";
import {Dispatch} from "redux";
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
            return {...state, initialized: action.value}
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
export const initializedSuccess = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)


// thunks

export const initializedAppTC = () => {
    return (dispatch: Dispatch<any>) => {
        authAPI.me()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthUserData())

                } else {
                }
                dispatch(initializedSuccess(true))
            })}

}
