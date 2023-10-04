import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {getProfileTC} from "../../redux/profile-reducer";
import {withRouter, WithRouterProps} from "./WithRouterContainer";
import {GetUsersResponseType} from "../../api/api";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";

type PathParamsType = {
    userId?: string
}

type MapStatePropsType = {
    profile: GetUsersResponseType | null

}
type MapDispatchPropsType = {
    getProfile: (userId: string) => void
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType & PathParamsType
type PropsType = WithRouterProps & OwnTypeProps

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        let userId = this.props.params.userId

        if (!userId) {
            userId = '2'
        }

        this.props.getProfile(userId)

    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }

}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    profile: state.profile.profile,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile: getProfileTC}),
    withRouter,
    withAuthNavigate
)(ProfileContainer)