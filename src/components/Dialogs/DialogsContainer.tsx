import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Dialogs} from "./Dialogs";
import {InitialMessagesPageType} from "../../redux/dialogs-reducer";

type MapStatePropsType = {
    messagesState: InitialMessagesPageType
}
export type DialogsPropsType = MapStatePropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        messagesState: state.dialogs
    }
}

const DialogsContainer = connect(mapStateToProps)(Dialogs)
export default DialogsContainer