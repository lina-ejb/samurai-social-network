import avatar from "../assets/images/avatar.png";
import avatar5 from "../assets/images/avatar2.png";
import avatar2 from "../assets/images/avatar3.png";
import avatar3 from "../assets/images/avatar4.png";
import avatar4 from "../assets/images/avatar5.png";

const UPDATE_NEW_MESSAGE_TEXT = "dialog/UPDATE-NEW-MESSAGE-TEXT";
const SEND_NEW_MESSAGE = "dialog/SEND-NEW-MESSAGE";

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
  newMessageText: "",
  chatBoxMessages: [
    { _id: 1, message: "Hello, how are you?" },
    { _id: 2, message: "Are we meeting today?" },
    { _id: 3, message: "Can you help me with this issue?" },
    { _id: 4, message: "Let's go shopping today" },
    { _id: 5, message: "Why am I so tired after doing nothing all day?" }
  ],
  dialogs: [
    { _id: 1, name: "Alina", avatar: avatar },
    { _id: 2, name: "Andrey", avatar: avatar5 },
    { _id: 3, name: "Helga", avatar: avatar2 },
    { _id: 4, name: "Aleksei", avatar: avatar3 },
    { _id: 5, name: "Volha", avatar: avatar4 }
  ]
};
type ActionType = SendNewMessageType | UpdateNewMessageType
export const dialogReducer = (state: InitialMessagesPageType = initialState, action: ActionType): InitialMessagesPageType => {

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newText
      };

    case SEND_NEW_MESSAGE:
      let body = state.newMessageText;
      return {
        ...state,
        newMessageText: "",
        chatBoxMessages: [...state.chatBoxMessages, { _id: 6, message: body }]
      };

    default:
      return state;

  }
};

// types
export type SendNewMessageType = ReturnType<typeof updateNewMessageTextAC>
export type UpdateNewMessageType = ReturnType<typeof sendNewMessageAC>

// actions
export const updateNewMessageTextAC = (newText: string) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText } as const);
export const sendNewMessageAC = () => ({ type: SEND_NEW_MESSAGE } as const);

