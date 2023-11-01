import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Preloader } from "../common/Preloader/Preloader";
import { getUsersTC, InitialStateType } from "../../redux/users-reducer";
import { User } from "./User";
import { Box } from "@mui/material";
import UsePagination from "../common/Pagination/UsePagination";

export default function Users()  {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector<boolean>(state => state.usersPage.isLoading);
  const users = useAppSelector<InitialStateType>(state => state.usersPage);
  const pageSize = useAppSelector<number>(state => state.usersPage.pageSize);
  const totalUsersCount = useAppSelector<number>(state => state.usersPage.totalUsersCount);
  const currentPage = useAppSelector<number>(state => state.usersPage.currentPage);
  const followingInProgress = useAppSelector<Array<number>>(state => state.usersPage.followingInProgress);
  const isAuth = useAppSelector<boolean>(state => state.userAuth.isAuth);


  useEffect(() => {
    dispatch(getUsersTC(currentPage, pageSize));
  }, [currentPage, pageSize, dispatch]);


  return (
    <Box>
      {isLoading ? null : <Preloader />}
      <UsePagination totalUsersCount={totalUsersCount} pageSize={pageSize} />

      {users.users.map(u => <User key={u.id}
                                  user={u} followingInProgress={followingInProgress} isAuth={isAuth} />)}
    </Box>
  );
};

