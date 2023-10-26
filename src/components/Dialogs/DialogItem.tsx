import React from "react";
import {NavLink} from "react-router-dom";
import s from './Dialogs.module.css'
import { Box } from "@mui/material";

type DialogItemsType = {
    name: string
    id: string | number
    user: string
}
const DialogItems = (props: DialogItemsType) => {
        const path = '/dialogs/' + props.id

        return (
            <Box className={s.dialog + ' ' + s.active}>
                <img alt='user_photo'
                    src={props.user}
                />
                <NavLink to={path}>{props.name}</NavLink>
            </Box>
        )
    }

;

export default DialogItems