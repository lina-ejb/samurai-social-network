import React, {ChangeEvent} from 'react';
import s from './MessageSender.module.css'
import {MessagesPageType} from "../../../../redux/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";




type MessageSenderType = {
    onSendMessageClick: () => void
    newTextHandler: (newText: string) => void
    newMessage: MessagesPageType
}

export const MessageSender = (props: MessageSenderType) => {

    const addMessage = () => {
        props.onSendMessageClick()
    }

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.newTextHandler(newText)
    }

    return (
        <div className={s.messageTextarea}>
            <TextField
                placeholder={'Type your text'}
                value={props.newMessage.newMessageText}
                onChange={newTextHandler}
            />
            <Button onClick={addMessage}
                    size='large'
                    variant="contained"
            >
                Send
            </Button>
        </div>
    )
}

