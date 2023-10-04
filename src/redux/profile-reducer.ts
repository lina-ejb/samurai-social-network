import {GetUsersResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunkDispatch} from "./store";

const ADD_TASK = 'ADD-TASK'
const CHANGE_TEXT = 'CHANGE-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

export type PostType = {
    _id: number
    message: string
    likeCounter: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostMessage: string
    profile: GetUsersResponseType | null

}

const initialState: ProfilePageType = {
    newPostMessage: '',
    posts: [
        {_id: 1, message: 'What\'s on your mind?', likeCounter: 25},
        {_id: 2, message: "Hey mate! How are things going?", likeCounter: 5},
    ],
    profile: null as null | GetUsersResponseType
}
type ActionType = AddPostTypeAC | ChangeTextTypeAC | SetUserTypeAC
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

export type SetUserTypeAC = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: GetUsersResponseType | null) => ({type: SET_USER_PROFILE, profile} as const)

export const getProfileTC = (userId: string) => {
    return (dispatch: AppThunkDispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))

            });
    }
}