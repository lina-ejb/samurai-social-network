import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

type MapDispatchPropsType = {
    setAuthUserData: (id: number, login: string, email: string) => void
}
type MapStatePropsType = {
    login: string | null
    isAuth: boolean | undefined
}

type OwnTypeProps = MapDispatchPropsType & MapStatePropsType

class HeaderContainer extends React.Component<OwnTypeProps> {

    componentDidMount() {
      usersAPI.getLogUserIn()
            .then((res) => {

                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data
                    this.props.setAuthUserData(id, login, email)
                }
            })
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)