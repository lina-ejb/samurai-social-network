import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { AppThunkDispatch } from "./store";
import { usersToggleFollow } from "../utils/updateObject";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "users/SET_USERS_TOTAL-COUNT";
const TOGGLE_IS_LOADING = "users/TOGGLE_IS_LOADING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE-IS-FOLLOWING-PROGRESS";


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
};
export type InitialStateType = {
  users: Array<UserType>,
  pageSize: number,
  totalUsersCount: number,
  currentPage: number
  isLoading: boolean
  followingInProgress: Array<number>
}
// reducer (pure function)
export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: usersToggleFollow(state.users, action.userId, "id", { followed: true })
        //  users: state.users.map(u => u.id === action.userId ? { ...u, followed: true } : u)
      };

    case UNFOLLOW:
      return {
        ...state,
        users: usersToggleFollow(state.users, action.userId, "id", { followed: false })
      };
    case SET_USERS : {
      return {
        ...state, users: action.users
      };
    }

    case SET_CURRENT_PAGE :
      return {
        ...state, currentPage: action.currentPage
      };

    case SET_USERS_TOTAL_COUNT :
      return {
        ...state, totalUsersCount: action.count
      };
    case TOGGLE_IS_LOADING : {
      return { ...state, isLoading: !action.isLoading };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS : {
      return {
        ...state,
        followingInProgress: action.isLoading
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => {
            return id !== action.userId;
          })

      };

    }
    default:
      return state;
  }
};

// types
type ActionType =
  FollowUserType
  | UnfollowUserType
  | SetUsersType
  | SetPageType
  | SetUsersTotalCountType
  | SetIsLoadingType
  | SetIsFollowingProgressType
export type FollowUserType = ReturnType<typeof follow>
export type UnfollowUserType = ReturnType<typeof unfollow>
export type SetUsersType = ReturnType<typeof setUsers>
export type SetPageType = ReturnType<typeof setCurrentPage>
export type SetUsersTotalCountType = ReturnType<typeof setTotalUsersCount>
export type SetIsLoadingType = ReturnType<typeof toggleIsFetching>
export type SetIsFollowingProgressType = ReturnType<typeof toggleFollowingProgress>

// actions
export const follow = (userId: number) => ({ type: FOLLOW, userId } as const);
export const unfollow = (userId: number) => ({ type: UNFOLLOW, userId } as const);
export const setUsers = (users: Array<UserType>) => ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage } as const);
export const toggleIsFetching = (isLoading: boolean) => ({ type: TOGGLE_IS_LOADING, isLoading } as const);

export const setTotalUsersCount = (totalUsersCount: number) => ({
  type: SET_USERS_TOTAL_COUNT,
  count: totalUsersCount
} as const);

export const toggleFollowingProgress = (isLoading: boolean, userId: number) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isLoading,
  userId
} as const);

//combine function
const followUnfollowFlow = async (dispatch: Dispatch<ActionType>, id: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingProgress(true, id));
  dispatch(toggleIsFetching(true));

  let response = await apiMethod(id);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleIsFetching(false));
  dispatch(toggleFollowingProgress(false, id));
};

// thunks
export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionType>) => {
  try {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  } catch (err) {
  }

};

export const followUserTC = (id: number) => async (dispatch: Dispatch<ActionType>) => {
  try {
    followUnfollowFlow(dispatch, id, usersAPI.addFollower.bind(usersAPI), follow);
  } catch (err) {

  }
};


export const unfollowUserTC = (id: number) => async (dispatch: AppThunkDispatch) => {
  followUnfollowFlow(dispatch, id, usersAPI.deleteFollower.bind(usersAPI), unfollow);
};


