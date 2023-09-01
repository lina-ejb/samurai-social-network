import React from 'react';
import {Layout} from "./components/Layout";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

export const ROUTES = {
    profile: '/profile/*',
    dialogs: '/dialogs/*',
    users: '/users/*'
};


export const App = () => (
    <Layout>
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile/*'}/>}/>
            <Route path={ROUTES.dialogs} element={<DialogsContainer/>}/>
            <Route path={ROUTES.profile} element={<Profile/>}/>
            <Route path={ROUTES.users} element={<UsersContainer/>}/>
        </Routes>
    </Layout>

);