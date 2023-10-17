import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { getProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter, WithRouterProps } from "./WithRouterContainer";
import { GetUsersResponseType } from "../../api/api";
import { compose } from "redux";
import { Navigate } from "react-router-dom";

export type PathParamsType = {
  userId?: string
}

type MapStatePropsType = {
  profile: GetUsersResponseType | null
  status: string
  authorisedUserID: any
  isAuth: boolean

}
type MapDispatchPropsType = {
  getProfile: (userId: string) => void
  getStatus: (userId: string) => void
  updateStatus: (status: string | boolean) => void
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType & PathParamsType
type PropsType = WithRouterProps & OwnTypeProps

class ProfileContainer extends React.Component<PropsType> {

  componentDidMount() {

    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.authorisedUserID;
      if (!userId && userId === null) {
        this.props.navigate("/login");
        return;
      }
    }

    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  render() {

    if (!this.props.isAuth && !this.props.params.userId) {
      return <Navigate to={"/login"} />;
    }
    return <Profile {...this.props}
                    profile={this.props.profile}
                    updateStatus={this.props.updateStatus}
                    status={this.props.status} />;
  }

}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
  profile: state.profile.profile,
  status: state.profile.status,
  authorisedUserID: state.userAuth.id,
  isAuth: state.userAuth.isAuth
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getProfile, getStatus: getStatus, updateStatus: updateStatus }),
  withRouter
  /*  withAuthNavigate*/
)(ProfileContainer);