import React from "react";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import { Login } from "../Login/Login";
import { Layout } from "./Layout";
import { HomePage } from "../HomePage/HomePage";
import { Users } from "../Users/Users";
import { Profile } from "../Profile/Profile";
import { ErrorPage } from "../../ErrorPage";


export const ROUTES = {
  profile: "/profile",
  userProfile: "/users/profile/:userId",
  dialogs: "/dialogs",
  users: "/users",
  auth: "/login"
};

export const  LayoutApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={ROUTES.dialogs} element={<DialogsContainer />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.userProfile} element={<Profile />} />
        <Route path={ROUTES.users} element={<Users/>} />
        <Route path={ROUTES.auth} element={<Login />} />
         <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </Layout>
  );
};

