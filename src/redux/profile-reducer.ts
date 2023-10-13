import {GetUsersResponseType, profileAPI, ResponseStatusType, usersAPI} from "../api/api";
import {AppThunkDispatch} from "./store";

const ADD_TASK = 'ADD-TASK'
const CHANGE_TEXT = 'CHANGE-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'

export type PostType = {
    _id: number
    message: string
    likeCounter: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostMessage: string
    profile: GetUsersResponseType | null
    status:  string
}

const initialState: ProfilePageType = {
    newPostMessage: '',
    posts: [
        {_id: 1, message: 'What\'s on your mind?', likeCounter: 25},
        {_id: 2, message: "Hey mate! How are things going?", likeCounter: 5},
    ],
    profile: null as null | GetUsersResponseType,
    status: '' as string
}
type ActionType = AddPostTypeAC | ChangeTextTypeAC | SetUserTypeAC | SetStatusAC
export const profileReducer = (state: ProfilePageType = initialState, action: ActionType): ProfilePageType => {
    switch (action.type) {

        case ADD_TASK:
            let postMessage = state.newPostMessage
            return {
                ...state,
                newPostMessage: '',
                posts: [{_id: new Date().getTime(), message: postMessage, likeCounter: 3}, ...state.posts]
            }

        case  CHANGE_TEXT:
            return {
                ...state,
                newPostMessage: action.text
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS:
            return { ...state, status: action.status };

        default:
            return state

    }
}

export type AddPostTypeAC = ReturnType<typeof addPostAC>
export const addPostAC = () => {

    return {
        type: ADD_TASK,
    } as const
}
export type ChangeTextTypeAC = ReturnType<typeof newTextAC>
export const newTextAC = (text: string) => {
    return {
        type: CHANGE_TEXT,
        text
    } as const
}

export type SetStatusAC = ReturnType<typeof setStatus>
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

export type SetUserTypeAC = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: GetUsersResponseType | null) => ({type: SET_USER_PROFILE, profile} as const)

export const getProfile = (userId: string) => {
    return (dispatch: AppThunkDispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))

            });
    }
}

export const getStatus = (userId: string) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))

            });
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0)
                dispatch(setStatus(status))
            })
    }
}