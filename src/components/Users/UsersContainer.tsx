import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    follow,
    InitialStateType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress,
    toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import {Users} from "./Users";

type MapStatePropsType = {
    users: InitialStateType
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isLoading: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isLoading: boolean) => void
    toggleFollowingProgress: (isLoading: boolean,  userId: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType



const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        users: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingInProgress: state.usersPage.followingInProgress
    }
}
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
})(Users)
