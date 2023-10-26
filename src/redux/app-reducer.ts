import { getAuthUserData } from "./auth-reducer";

const SET_ERROR = "APP/SET-ERROR"
const SET_INITIALIZED = "APP/SET-INITIALIZED"

const initialState: InitialType = {
  error: null,
  initialized: false
};

export type InitialType = {
  error: null | string,
  initialized: boolean
}

export const appReducer = (state: InitialType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_ERROR: {
      return { ...state, error: action.error };

    }
    case SET_INITIALIZED: {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};

// types
type ActionType = SetAppErrorActionType | SetInitializedActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetInitializedActionType = ReturnType<typeof initializedSuccess>

// actions
export const setAppErrorAC = (error: string | null) => ({ type: SET_ERROR, error } as const);
export const initializedSuccess = () => ({ type: SET_INITIALIZED } as const);

// thunks
export const initializeApp = () => (dispatch: any | SetInitializedActionType) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    });
};
