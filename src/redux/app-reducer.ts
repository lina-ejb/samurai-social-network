import { getAuthUserData } from "./auth-reducer";
import { Dispatch } from "redux";

const SET_ERROR = "APP/SET-ERROR";
const SET_INITIALIZED = "APP/SET-INITIALIZED";
const DARK_MODE = "APP/DARK-MODE";

const initialState: InitialType = {
  error: null,
  initialized: false,
  isLightMode: !!JSON.parse(localStorage.getItem("lightMode") || "{}")
};

export type InitialType = {
  error: null | string,
  initialized: boolean
  isLightMode: boolean
}

export const appReducer = (state: InitialType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_ERROR: {
      return { ...state, error: action.error };

    }
    case SET_INITIALIZED: {
      return { ...state, initialized: true };
    }
    case DARK_MODE: {
      return { ...state, isLightMode: action.payload };
    }

    default:
      return state;
  }
};

// types
type ActionType = SetAppErrorActionType | SetInitializedActionType | HandleDarkModeActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetInitializedActionType = ReturnType<typeof initializedSuccess>
type HandleDarkModeActionType = ReturnType<typeof handleDarkModeAC>

// actions
export const setAppErrorAC = (error: string | null) => ({ type: SET_ERROR, error } as const);
export const initializedSuccess = () => ({ type: SET_INITIALIZED } as const);
export const handleDarkModeAC = (value: boolean) => ({ type: DARK_MODE, payload: value } as const);

// thunks
export const initializeApp = () => (dispatch: any | SetInitializedActionType) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    });
};

export const handleDarkMode = (value: any) => async (dispatch: Dispatch) => {
  // getting the true or false value from the parameter and saving that to localstorage
  localStorage.setItem("lightMode", value);

  //dispatch data to reducer to be accessed as payload.action
  dispatch(handleDarkModeAC(value));
};