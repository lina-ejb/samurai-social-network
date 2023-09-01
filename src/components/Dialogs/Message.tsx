import React from "react";
import s from './Dialogs.module.css'
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/system";
import {Grid} from "@mui/material";


type MessageType = {
    id: string | number
    message: string

}

const theme = createTheme();
const useStyles = makeStyles({
    text: {
        maxWidth: '527px',
        borderRadius: '10px 10px 0 10px',
        backgroundColor: '#0066cc',
        color: '#FFFFFF',
        padding: theme.spacing(1),
        [theme.breakpoints.between('xs', 'md')]: {

            padding: theme.spacing(0.5),
        }
    },


})
const Message = (props: MessageType) => {
    const classes = useStyles()
    return (
        <div className={s.messageContainer}>

            <Grid className={classes.text}> {props.message}</Grid>

        </div>
    )
}

export default Message

