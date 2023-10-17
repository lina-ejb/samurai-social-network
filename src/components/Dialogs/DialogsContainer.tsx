import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Dialogs} from "./Dialogs";
import {InitialMessagesPageType} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import React from "react";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";


type MapStatePropsType = {
    messagesState: InitialMessagesPageType

}
export type DialogsPropsType = MapStatePropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        messagesState: state.dialogs,

    }
}

 export default compose<React.ComponentType>(
     connect(mapStateToProps),
     withAuthNavigate
 )(Dialogs)




