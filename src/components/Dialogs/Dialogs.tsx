import React from "react";
import DialogItems from "./DialogItem";
import Message from "./Message";
import {MessageSenderContainer} from "./MessageSenderContainer";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/system";
import {DialogsPropsType} from "./DialogsContainer";
import {Box, Grid, Paper} from "@mui/material";

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        padding: theme.spacing(2),

    },
    parentPaper: {
        margin: "auto",
        width: '100%',
        padding: theme.spacing(2),
        height: '70vh',
        [theme.breakpoints.between('xs', 'md')]: {
            padding: theme.spacing(0)
        }

    },
    messageBox: {
        overflowY: 'scroll',
        height: '50vh',
        padding: theme.spacing(2),
        display: 'flex',
        gap: '20px',
        flexDirection: "column",
    },
    dialogs: {
        display: 'flex',
        [theme.breakpoints.between('xs', 'md')]: {
            flexDirection: 'column',
            visibility: 'hidden'
        }
    },
    sender: {
        display: 'flex',
        justifyContent: 'end',
    },

})

export const Dialogs = (props: DialogsPropsType) => {
        const classes = useStyles()

        const mappedDialogs = props.messagesState.dialogs.map((el, index) => (
            <DialogItems
                key={el._id}
                name={el.name}
                id={el._id}
                user={el.avatar}/>
        ))

        const mappedMessages = props.messagesState.chatBoxMessages.map((el, index) => (
            <Message
                key={el._id}
                message={el.message}
                id={el._id}/>
        ))

        return <div className={classes.root}>
            <Grid container rowSpacing={1}>
                <Grid item xs={6} sm={8} md={12} >
                    <Paper className={classes.messageBox}>{mappedMessages}</Paper>
                </Grid>
                <Grid item xs={6} sm={4} md={4} container>
                            <Box className={classes.dialogs}
                            > {mappedDialogs}</Box>
                </Grid>
                <Grid item xs={12} sm={8} md={8} container>
                    <Grid xs container direction="column" >
                        <Grid className={classes.sender} >
                            <MessageSenderContainer/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>;
    }
;


