import { connect } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { followUserTC, getUsersTC, InitialStateType, unfollowUserTC } from "../../redux/users-reducer";
import { Users } from "./Users";
import { compose } from "redux";
import React from "react";
import { withRouter } from "../Profile/WithRouterContainer";
import {
  getAllUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsAuth,
  getIsLoading,
  getPageSize,
  getTotalUsersCount
} from "../../redux/users-selector";

type MapStatePropsType = {
  users: InitialStateType
  pageSize: number,
  totalUsersCount: number
  currentPage: number
  isLoading: boolean
  followingInProgress: Array<number>
  isAuth: boolean

}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unFollowUser: (id: number) => void
  followUser: (id: number) => void
  params: Record<string, string>;
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
    isAuth: getIsAuth(state)

  };
};
export default compose<React.ComponentType>(connect(mapStateToProps, {
  getUsers: getUsersTC,
  unFollowUser: unfollowUserTC,
  followUser: followUserTC
}), withRouter)(Users);
