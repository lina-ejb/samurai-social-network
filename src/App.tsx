import React from 'react';
import {LayoutApp} from "./components/Layout/LayoutApp";
import {AppRootStateType} from "./redux/store";
import {LoaderMu} from "./components/Users/LoaderMU";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {withRouter} from "./components/Profile/WithRouterContainer";


type MapDispatchPropsType = {
    initializeApp: () => void
}
type OwnTypeProps = MapDispatchPropsType & MapStatePropsType

class App extends React.Component<OwnTypeProps> {

    componentDidMount() {
        this.props.initializeApp?.()

    }

    render() {
        if (!this.props.initialized) {
            return <LoaderMu/>
        }
        return (
            <LayoutApp/>
        )
    }
}

type MapStatePropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})


export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);


