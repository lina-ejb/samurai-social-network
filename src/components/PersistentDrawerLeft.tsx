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


const useStyles = makeStyles({
    drawer: {
        width: '190px',
        color: 'blue',
    }
})

export const PersistentDrawerLeft = () => {
    const classes = useStyles()
    const itemList = [
        {
            text: 'Profile',
            icon: <PermIdentityIcon fontSize='medium'/>
        },
        {
            text: 'Messages',
            icon: <MessageIcon fontSize='medium'/>
        },
        {
            text: 'News',
            icon: <NewspaperIcon fontSize='medium'/>
        },
        {
            text: 'Music',
            icon: <MusicNoteIcon fontSize='medium'/>
        },
        {
            text: 'Settings',
            icon: <SettingsApplicationsIcon fontSize='medium'/>
        }
    ]
    return (

        <MUIDrawer variant={"permanent"} className={classes.drawer}>
            <List>
                {itemList.map((item, index) => {
                    const {text, icon} = item
                    return (
                        <ListItem key={text} disablePadding sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'primary.dark',
                                color: 'common.white',
                            },
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'common.white',
                            },
                        }}>

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

};
