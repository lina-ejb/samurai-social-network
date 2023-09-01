import React, {ChangeEvent} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {NewDialogsMessageType} from "./MessageSenderContainer";

export const MessageSender = (props: NewDialogsMessageType) => {

    const addMessage = () => {
        props.onSendMessageClick()
    }

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.newTextHandler(newText)
    }

    return (
        <>
            <TextField
                size="small"
                placeholder={'Type your text'}
                value={props.newMessage.newMessageText}
                onChange={newTextHandler}
            />
            <Button sx={{ background: '#25476a',
            }}

                onClick={addMessage}
                    size='small'
                    variant="contained"
            >
                Send
            </Button>
        </>
    )
}

