import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {getAuthUserData, logOutTC} from "../../redux/auth-reducer";

type MapDispatchPropsType = {
    getAuthUserData: () => void
    logOut: () => void
}
type MapStatePropsType = {
    login: string | null
    isAuth: boolean | undefined
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<OwnTypeProps> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header
                login={this.props.login}
                isAuth={this.props.isAuth}
                logOut={this.props.logOut}
            />
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    login: state.userAuth.login,
    isAuth: state.userAuth.isAuth
})

export default connect(mapStateToProps, {getAuthUserData, logOut: logOutTC})(HeaderContainer)