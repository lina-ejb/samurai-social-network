const SET_USER_DATA = 'SET-USER-DATA'



export type AuthType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

const initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
type ActionType = SetUserTypeAC
export const authReducer = (state: AuthType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA: {

            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

export type SetUserTypeAC = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (id: number, login: string, email: string) => ({type: SET_USER_DATA, data: {id, login, email}} as const)