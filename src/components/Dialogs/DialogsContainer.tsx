import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Dialogs} from "./Dialogs";
import {InitialMessagesPageType} from "../../redux/dialogs-reducer";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";
import React from "react";



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




