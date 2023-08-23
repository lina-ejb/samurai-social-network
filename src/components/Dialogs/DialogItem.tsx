import React from "react";
import s from '.././Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemsType = {
    name: string
    id: string | number
    user: string
}
const DialogItems = (props: DialogItemsType) => {
        const path = '/dialogs/' + props.id

        return (
            <div className={s.dialog + ' ' + s.active}>
                <img
                    src={props.user}
                />
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        )
    }

;

export default DialogItems