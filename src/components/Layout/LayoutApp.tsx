import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "../HomePage/HomePage";
import { Preloader } from "../common/Preloader/Preloader";
import { useAppSelector } from "../../redux/store";
import "./LayoutApp.module.css";
import { getElementID, getElementSelector } from "../../utils/getElementHelper";


const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"));
const Profile = lazy(() => import("../Profile/Profile"));
const ErrorPage = lazy(() => import("../../ErrorPage"));
const Users = lazy(() => import("../Users/Users"));
const Login = lazy(() => import("../Login/Login"));

export const ROUTES = {
  profile: "/profile",
  userProfile: "/users/profile/:userId",
  dialogs: "/dialogs",
  users: "/users",
  auth: "/login"
};

export const LayoutApp = () => {
  const [theme, setTheme] = useState<string | null>(null);
  const lightMode = useAppSelector((state) => state.app.isLightMode);

  useEffect(() => {
    let theme = localStorage.getItem("lightMode");
    setTheme(theme);
  });


  let headerElement = getElementID("header");
  let leftDrawer: HTMLElement | null = getElementSelector(".makeStyles-drawer-1 .MuiPaper-root");
  let drawerItems = document.querySelectorAll<HTMLElement>(".css-lvjbvh-MuiListItemIcon-root");
  let drawerText = getElementID("drawer");
  let footerElement = getElementID("footerBox");
  const mainBG: HTMLElement | null = getElementSelector(".css-ksmjtb");

  function changeModeHandler() {
    if (headerElement) {
      headerElement.dataset.theme = lightMode + "";
    }
    if (leftDrawer) {
      leftDrawer.dataset.theme = lightMode + "";
    }
    if (drawerText) {
      drawerText.dataset["theme"] = lightMode + "";
    }
    if (footerElement) {
      footerElement.dataset.footertheme = lightMode + "";
    }
    if (mainBG) {
      mainBG.dataset.themeforbg = lightMode + "";
    }
    if (drawerItems) {
      for (let i = 0; i < drawerItems.length; i++) {
        drawerItems[i].dataset.theme = lightMode + "";
      }
    }
  }

  if (theme) {
    changeModeHandler();
  }

  return (
    <Layout>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={ROUTES.dialogs} element={<DialogsContainer />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.userProfile} element={<Profile />} />
          <Route path={ROUTES.users} element={<Users />} />
          <Route path={ROUTES.auth} element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

