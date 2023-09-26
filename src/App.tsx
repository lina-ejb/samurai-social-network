import React from 'react';
import {Layout} from "./components/Layout";
import {Navigate, Route, Routes} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


export const ROUTES = {
    profile: '/profile/:userId?',
    dialogs: '/dialogs/*',
    users: '/users/*',
    auth: '/login/'
};


export const App = () => (
    <Layout>
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile/*'}/>}/>
            <Route path={ROUTES.dialogs} element={<DialogsContainer/>}/>
            <Route path={ROUTES.profile} element={<ProfileContainer/>}/>
            <Route path={ROUTES.users} element={<UsersContainer/>}/>
            <Route path={ROUTES.auth} element={<HeaderContainer/>}/>
        </Routes>
    </Layout>

);