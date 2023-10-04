import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/store";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isAuth: state.userAuth.isAuth
    }
}

export function withAuthNavigate<T>(Component: any) {

    const NavigateComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to="/login"/>
        return <Component  {...(restProps as T)}/>
    }

    return connect(mapStateToProps)(NavigateComponent)
}

