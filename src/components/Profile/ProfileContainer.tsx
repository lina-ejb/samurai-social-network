import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter, WithRouterProps} from "./WithRouterContainer";
import {GetUsersResponseType, usersAPI} from "../../api/api";

type PathParamsType = {
    userId?: number
}

type MapStatePropsType = {
    profile: GetUsersResponseType | null
}
type MapDispatchPropsType = {
    setUserProfile: (profile: GetUsersResponseType | null) => void
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType & PathParamsType
type PropsType = WithRouterProps & OwnTypeProps

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.params.userId

        if (!userId) {
            userId = '2'
        }

        usersAPI.getProfile(userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    }

}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))
