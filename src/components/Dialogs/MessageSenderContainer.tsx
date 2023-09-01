import {AppRootStateType} from "../../redux/store";
import {InitialMessagesPageType, sendNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {MessageSender} from "./MessageSender";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStatePropsType = {
    newMessage: InitialMessagesPageType
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        newMessage: state.dialogs
    }
}

type MapDispatchPropsType = {
    newTextHandler: (newText: string) => void
    onSendMessageClick: () => void

}
export type NewDialogsMessageType = MapStatePropsType & MapDispatchPropsType
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        newTextHandler: (newText: string) => {
            dispatch(updateNewMessageTextAC(newText))
        },
        onSendMessageClick: () => {
            dispatch(sendNewMessageAC())
        }
    }
}

export const MessageSenderContainer = connect(mapStateToProps, mapDispatchToProps)(MessageSender);




