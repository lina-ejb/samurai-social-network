import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {AppThunkDispatch} from "./store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL-COUNT'
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'


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
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: true,
    followingInProgress: []
}
export type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    isLoading: boolean
    followingInProgress: Array<number>
}
type ActionType =
    FollowUserType
    | UnfollowUserType
    | SetUsersType
    | SetPageType
    | SetUsersTotalCountType
    | SetIsLoadingType
    | SetIsFollowingProgressType
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
        case SET_USERS : {
            return {
                ...state, users: action.users
            }
        }

        case SET_CURRENT_PAGE :
            return {
                ...state, currentPage: action.currentPage
            }

        case SET_USERS_TOTAL_COUNT :
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_LOADING : {
            return {...state, isLoading: !action.isLoading}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => {
                        return id !== action.userId
                    })

            }

        }
        default:
            return state
    }
}

export type FollowUserType = ReturnType<typeof follow>
export const follow = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export type UnfollowUserType = ReturnType<typeof unfollow>
export const unfollow = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}
export type SetUsersType = ReturnType<typeof setUsers>
export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export type SetPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    } as const
}

export type SetUsersTotalCountType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_USERS_TOTAL_COUNT,
        count: totalUsersCount
    } as const
}

export type SetIsLoadingType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isLoading: boolean) => {
    return {
        type: TOGGLE_IS_LOADING,
        isLoading
    } as const
}
export type SetIsFollowingProgressType = ReturnType<typeof toggleFollowingProgress>
export const toggleFollowingProgress = (isLoading: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isLoading,
    userId
} as const)


export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            });
    }
}

export const followUserTC = (id: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(toggleFollowingProgress(true, id))
        dispatch(toggleIsFetching(true))

        usersAPI.addFollower(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(follow(id))
                }
                dispatch(toggleIsFetching(false))
                dispatch(toggleFollowingProgress(false, id))
            })
    }
}

export const unfollowUserTC = (id: number) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(toggleFollowingProgress(true, id))
        dispatch(toggleIsFetching(true))

        usersAPI.deleteFollower(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollow(id))
                }
                dispatch(toggleIsFetching(false))
                dispatch(toggleFollowingProgress(false, id))

            });
    }
}

