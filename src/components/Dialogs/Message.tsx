import React from "react";
import s from '.././Dialogs.module.css'


type MessageType = {

    message: string
    id: string | number

}

const Message = (props: MessageType) => {
    return (
        <div className={s.messages}>

            {props.message}
        </div>
    )
}

export default Message