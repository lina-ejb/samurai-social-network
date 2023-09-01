const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UserType = {
    id: number,
    followed: boolean
    name: string
    photos: {
        small: string
        large: string
    }
    status: string
    location: {
        city: string
        country: string
    }
}

const initialState: InitialStateType = {
    users: []
}
export type InitialStateType = {
    users: Array<UserType>
}
type ActionType = FollowUserType | UnfollowUserType | SetUsersType
export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case SET_USERS :
            return {
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export type FollowUserType = ReturnType<typeof followAC>
export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export type UnfollowUserType = ReturnType<typeof unfollowAC>
export const unfollowAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}
export type SetUsersType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}