import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer,
    usersPage: usersReducer,
    userAuth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store;