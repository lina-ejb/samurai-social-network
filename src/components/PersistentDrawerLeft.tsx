import React from "react";
import {Drawer as MUIDrawer} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {makeStyles} from '@mui/styles';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MessageIcon from '@mui/icons-material/Message';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles({
    drawer: {
        width: '190px',
        '& .MuiPaper-root': {
            background: '#dce0ef',
            position: 'static',


        },
        '& .MuiList-root': {
            position: 'fixed',

        },
    }
})

export function PersistentDrawerLeft() {

    const navigate = useNavigate()
    const classes = useStyles()
    const itemList = [
        {
            text: 'Profile',
            icon: <PermIdentityIcon fontSize='medium'/>,
            onClick: () => {
                navigate('/profile')
            }
        },
        {
            text: 'Messages',
            icon: <MessageIcon fontSize='medium'/>,
            onClick: () => {
                navigate('/dialogs')
            }
        },
        {
            text: 'Users',
            icon: <NewspaperIcon fontSize='medium'/>,
            onClick: () => {
                navigate('/users')
            }
        },
        {
            text: 'Music',
            icon: <MusicNoteIcon fontSize='medium'/>,
            onClick: () => {
                navigate('/music')
            }
        },

        {
            text: 'Settings',
            icon: <SettingsApplicationsIcon fontSize='medium'/>,
            onClick: () => {
                navigate('/settings')
            },
        }
    ]
    return (

        <MUIDrawer variant={"permanent"} className={classes.drawer}>
            <List>
                {itemList.map((item, index) => {
                    const {text, icon, onClick} = item
                    return (
                        <ListItem key={text} disablePadding sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'primary.dark',
                            },
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            },
                        }}
                                  onClick={onClick}>

                            <ListItemButton>
                                {icon && <ListItemIcon sx={[
                                    {minWidth: 'auto'},
                                    (theme) => ({
                                        paddingRight: theme.spacing(4),
                                    }),
                                ]}>
                                    {icon}
                                </ListItemIcon>}
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    )
                })}


            </List>
        </MUIDrawer>

    )

}

