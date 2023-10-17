import { AppRootStateType } from "./store";

export const getAllUsers = (state: AppRootStateType) => {
  return state.usersPage;
};

export const getPageSize = (state: AppRootStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppRootStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppRootStateType) => {
  return state.usersPage.currentPage;
};

export const getIsLoading = (state: AppRootStateType) => {
  return state.usersPage.isLoading;
};
export const getFollowingInProgress = (state: AppRootStateType) => {
  return state.usersPage.followingInProgress;
};
export const getIsAuth = (state: AppRootStateType) => {
  return state.userAuth.isAuth;
};