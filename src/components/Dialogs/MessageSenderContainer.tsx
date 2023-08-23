import {MessageSender} from "./MessageSender";
import {connect} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../redux/redux-store";
import {sendNewMessageAC, updateNewMessageTextAC} from "../../../../redux/dialogs-reducer";
//dialogs
const mapStateToProps = (state: AppRootStateType) => {
    return {
        newMessage: state.dialogs

    }
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
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





//
// export const MessageSenderContainer = (props: MessageSenderType) => {
//
//     const dispatch = useDispatch()
//     const messagesPage = useSelector<AppRootStateType, MessagesPageType>(state => state.dialogs)
//
//     const onSendMessageClick = () => {
//         dispatch(sendNewMessageAC(messagesPage.newMessageText))
//     }
//
//     const newTextHandler = (newText: string) => {
//         dispatch(updateNewMessageTextAC(newText))
//     }
//
//     return (
//         <MessageSender newTextHandler={newTextHandler}
//                        onSendMessageClick={onSendMessageClick}
//                        newMessage={props.state}
//         />
//     )
// }
