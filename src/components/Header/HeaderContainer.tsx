import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {getLogUserInTC, setAuthUserData} from "../../redux/auth-reducer";

type MapDispatchPropsType = {
    setAuthUserData: (id: number, login: string, email: string) => void
    getLogUserIn: () => void
}
type MapStatePropsType = {
    login: string | null
    isAuth: boolean | undefined
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<OwnTypeProps> {

    componentDidMount() {
        this.props.getLogUserIn()
    }

    render() {
        return (
            <Header
                login={this.props.login}
                auth={this.props.isAuth}
            />
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    login: state.userAuth.login,
    isAuth: state.userAuth.isAuth
})

export default connect(mapStateToProps, {setAuthUserData, getLogUserIn: getLogUserInTC})(HeaderContainer)