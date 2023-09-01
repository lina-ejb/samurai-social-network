import React from 'react';
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";


export class Users extends React.Component<UsersPropsType> {

     getUser = () => {
        if (this.props.users.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            });

        }
    }
    render() {
        return (
            <div>
                <Button onClick={this.getUser} variant="outlined" size="small">Get Users</Button>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>

                    {this.props.users.users.map(u => <ListItem key={u.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={u.photos.small != null ? u.photos.small : "/static/images/avatar/1.jpg"}/>

                        </ListItemAvatar>
                        <ListItemText>{u.name}
                            <Typography color="text.primary">{u.status}</Typography>
                            <Typography> {"u.location.city"}</Typography>
                            <ListItemText> {'u.location.country'}
                                <Divider/>
                            </ListItemText>
                        </ListItemText>
                        {u.followed ? <Button variant="outlined" size="small" onClick={() => {
                            this.props.unfollow(u.id)
                        }}>
                            Follow
                        </Button> : <Button variant="outlined" size="small" onClick={() => {
                            this.props.follow(u.id)
                        }}>
                            Unfollow
                        </Button>}

                    </ListItem>)}

                </List>

            </div>
        )
    }
}