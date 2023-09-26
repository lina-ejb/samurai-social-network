import avatar from "../components/avatar/avatar.png";
import avatar5 from "../components/avatar/avatar2.png";
import avatar2 from "../components/avatar/avatar3.png";
import avatar3 from "../components/avatar/avatar4.png";
import avatar4 from "../components/avatar/avatar5.png";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_NEW_MESSAGE = 'SEND-NEW-MESSAGE'

export type InitialMessagesPageType = {
    chatBoxMessages: Array<MessageType>
    dialogs: Array<DialogType>
    newMessageText: string
}
export type MessageType = {
    message: string
    _id: number
}
export type DialogType = {
    name: string
    _id: number
    avatar: any
}


const initialState = {
    newMessageText: '',
    chatBoxMessages: [
        {_id: 1, message: 'Hello, how are you?'},
        {_id: 2, message: "Are we meeting today?"},
        {_id: 3, message: "Can you help me with this issue?"},
        {_id: 4, message: "Let's go shopping today"},
        {_id: 5, message: 'Why am I so tired after doing nothing all day?'},
    ],
    dialogs: [
        {_id: 1, name: 'Alina', avatar: avatar},
        {_id: 2, name: "Andrey", avatar: avatar5},
        {_id: 3, name: "Helga", avatar: avatar2},
        {_id: 4, name: "Aleksei", avatar: avatar3},
        {_id: 5, name: "Volha", avatar: avatar4}
    ]
}
type ActionType = SendNewMessageType | UpdateNewMessageType
export const dialogReducer = (state: InitialMessagesPageType = initialState, action: ActionType): InitialMessagesPageType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }


        case SEND_NEW_MESSAGE:
            let body = state.newMessageText
            return {
                ...state,
                newMessageText: '',
                chatBoxMessages: [...state.chatBoxMessages, {_id: 6, message: body}]
            }


        default:
            return state

    }
}


export type SendNewMessageType = ReturnType<typeof updateNewMessageTextAC>
export const updateNewMessageTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText
    } as const
}

export type UpdateNewMessageType = ReturnType<typeof sendNewMessageAC>
export const sendNewMessageAC = () => {
    return {
        type: SEND_NEW_MESSAGE,

    } as const
}
