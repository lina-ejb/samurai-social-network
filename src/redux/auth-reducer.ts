import { authAPI, LoginParamsType } from "../api/api";
import { Dispatch } from "redux";
import { setAppErrorAC } from "./app-reducer";

const SET_USER_DATA = "auth/SET-USER-DATA";

export type AuthType = {
  id: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
}

const initialState: AuthType = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false
};
type ActionType = SetUserTypeAC
export const authReducer = (state: AuthType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_USER_DATA: {

      return {
        ...state,
        ...action.data
      };
    }
    default:
      return state;
  }
};

// actions
export const setAuthUserData = (id: null | number, email: string | null, login: string | null, isAuth: boolean) => ({
  type: SET_USER_DATA,
  data: { id, login, email, isAuth }
} as const);


// types
export type SetUserTypeAC = ReturnType<typeof setAuthUserData>


// thunks
export const getAuthUserData = () => async (dispatch: Dispatch<SetUserTypeAC>) => {
  let res = await authAPI.me();
  if (res.data.resultCode === 0) {
    let { id, login, email } = res.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};


export const loginTC = (params: LoginParamsType) => async (dispatch: Dispatch<any>) => {
  let res = await authAPI.login(params);
  if (res.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    dispatch(setAppErrorAC(res.data.messages[0]));
  }
};


export const logOutTC = () => async (dispatch: Dispatch<any>) => {
  let res = await authAPI.logOut();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
