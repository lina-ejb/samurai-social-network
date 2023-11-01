import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Message, MusicNote, Newspaper, PermIdentity, SettingsApplications } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  drawer: {
    width: "190px",
    "& .MuiPaper-root": {
      backgroundColor: "var(--background)",
      position: "static"
    },
    "& .MuiList-root": {
      position: "fixed"
    },
    "& .MuiListItemButton-root": {
      width: "190px"
    },
    "& .MuiListItemIcon-root": {
      color: 'var(--color)'
    },
    "& .MuiTypography-root": {
      color: 'var(--color)'
    }
  }
});

export function PersistentDrawerLeft() {

  const navigate = useNavigate();
  const classes = useStyles();


  const itemList = [
    {
      text: "Profile",
      icon: <PermIdentity fontSize="medium" />,
      onClick: () => {
        navigate("/profile");

      }
    },
    {
      text: "Messages",
      icon: <Message fontSize="medium" />,
      onClick: () => {
        navigate("/dialogs");
      }
    },
    {
      text: "Users",
      icon: <Newspaper fontSize="medium" />,
      onClick: () => {
        navigate("/users");
      }
    },
    {
      text: "Music",
      icon: <MusicNote fontSize="medium" />,
      onClick: () => {
        navigate("/music");
      }
    },

    {
      text: "Settings",
      icon: <SettingsApplications fontSize="medium" />,
      onClick: () => {
        navigate("/settings");
      }
    }
  ];

  return (

    <Drawer variant={"permanent"} className={classes.drawer}>

      <List id={"drawer"}>
        {itemList.map((item) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem key={text} id={"itemList"} disablePadding sx={{

              "&:hover": {
                backgroundColor: "primary.light"
              }
            }}
                      onClick={onClick}>

              <ListItemButton>
                {icon && <ListItemIcon sx={[
                  { minWidth: "auto" },
                  (theme) => ({
                    paddingRight: theme.spacing(4)
                  })
                ]}>
                  {icon}
                </ListItemIcon>}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

    </Drawer>


  );

}

