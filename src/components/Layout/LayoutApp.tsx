import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import ProfileContainer from "../Profile/ProfileContainer";
import UsersContainer from "../Users/UsersContainer";
import { Login } from "../Login/Login";
import { Layout } from "./Layout";
import { HomePage } from "../HomePage/HomePage";
import { ErrorPage } from "../../ErrorPage";


export const ROUTES = {
  profile: "/profile/:userId?",
  dialogs: "/dialogs",
  users: "/users",
  auth: "/login"
};

export const LayoutApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={ROUTES.dialogs} element={<DialogsContainer />} />
        <Route path={ROUTES.profile} element={<ProfileContainer />} />
        <Route path={ROUTES.users} element={<UsersContainer />} />
        <Route path={ROUTES.auth} element={<Login />} />
        <Route path="/404" element={<ErrorPage />} />
        {/*          <Route path={"/profile/:userId?'/404" && '/404'} element={<ErrorPage/>}/>*/}
        <Route path="*" element={<Navigate to={"/404/"} />} />
      </Routes>
    </Layout>
  );
};

