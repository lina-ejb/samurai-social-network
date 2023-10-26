import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { initializeApp } from "./redux/app-reducer";
import { LoaderMu } from "./components/common/LoaderMU";
import { LayoutApp } from "./components/Layout/LayoutApp";

export const App = () => {

  const initialize = useAppSelector<boolean>(state => state.app.initialized);
  const dispatch = useAppDispatch();

  useEffect(() => dispatch(initializeApp()), [dispatch]);
  if (!initialize) {
    return <LoaderMu />;
  }
  return (
    <LayoutApp />
  );
};





