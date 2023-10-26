import { GetUsersResponseType, profileAPI, usersAPI } from "../api/api";
import { AppThunkDispatch } from "./store";

const ADD_TASK = "profile/ADD-TASK";
const CHANGE_TEXT = "profile/CHANGE-TEXT";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_STATUS = "profile/SET_STATUS";

export type PostType = {
  _id: number
  message: string
  likeCounter: number
}
export type ProfilePageType = {
  posts: Array<PostType>
  newPostMessage: string
  profile: GetUsersResponseType | null
  status: string
}

const initialState: ProfilePageType = {
  newPostMessage: "",
  posts: [
    { _id: 1, message: "What's on your mind?", likeCounter: 25 },
    { _id: 2, message: "Hey mate! How are things going?", likeCounter: 5 }
  ],
  profile: null as null | GetUsersResponseType,
  status: "" as string
};
type ActionType = AddPostTypeAC | ChangeTextTypeAC | SetUserTypeAC | SetStatusAC
export const profileReducer = (state: ProfilePageType = initialState, action: ActionType): ProfilePageType => {
  switch (action.type) {

    case ADD_TASK:
      let postMessage = state.newPostMessage;
      return {
        ...state,
        newPostMessage: "",
        posts: [{ _id: new Date().getTime(), message: postMessage, likeCounter: 3 }, ...state.posts]
      };

    case  CHANGE_TEXT:
      return {
        ...state,
        newPostMessage: action.text
      };
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS:
      return { ...state, status: action.status };

    default:
      return state;

  }
};
// types

export type AddPostTypeAC = ReturnType<typeof addPostAC>
export type ChangeTextTypeAC = ReturnType<typeof newTextAC>
export type SetStatusAC = ReturnType<typeof setStatus>
export type SetUserTypeAC = ReturnType<typeof setUserProfile>

// actions

export const addPostAC = () => ({ type: ADD_TASK } as const);

export const newTextAC = (text: string) => ({ type: CHANGE_TEXT, text } as const);

export const setStatus = (status: any) => ({ type: SET_STATUS, status } as const);

export const setUserProfile = (profile: GetUsersResponseType | null) => ({ type: SET_USER_PROFILE, profile } as const);

// thunks
export const getProfile = (userId: number) => async (dispatch: AppThunkDispatch) => {
  try {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
  } catch (err) {

  }
};

export const getStatus = (userId: number) => async (dispatch: AppThunkDispatch) => {

    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));


};

export const updateStatus = (status: string) => async (dispatch: AppThunkDispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0)
    dispatch(setStatus(status));

};
