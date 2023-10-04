import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {followUserTC, getUsersTC, InitialStateType, unfollowUserTC} from "../../redux/users-reducer";
import {Users} from "./Users";

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
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        users: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.userAuth.isAuth
    }
}
export default connect(mapStateToProps, {
    getUsers: getUsersTC,
    unFollowUser: unfollowUserTC,
    followUser: followUserTC
})(Users)
