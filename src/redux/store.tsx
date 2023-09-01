import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogReducer,
    usersPage: usersReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
