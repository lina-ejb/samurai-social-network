import React from "react";
import { Avatar, Button, Divider, Link, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { followUserTC, unfollowUserTC, UserType } from "../../redux/users-reducer";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

type UserPropsType = {
  user: UserType
  followingInProgress: Array<number>
  isAuth: boolean
}

export const User: React.FC<UserPropsType> = ({
                                                user,
                                                followingInProgress,
                                                isAuth
                                              }) => {

  const params = useParams();
  const dispatch = useAppDispatch();

  const unfollowUser = (id: number) => {
    dispatch(unfollowUserTC(id));
  };

  const followUser = (id: number) => {
    dispatch(followUserTC(id));
  };

  return (

    <ListItem key={user.id} alignItems="flex-start">

        <Link href={"/samurai-social-network/users/" + user.id}>
          <ListItemAvatar>
            <Avatar src={user.photos.small != null ? user.photos.small : "/static/images/images/1.jpg"} />
          </ListItemAvatar>
        </Link>



      <ListItemText>{user.name}
        <Typography color="text.primary">{user.status}</Typography>
        <Typography> {"u.location.city"}</Typography>
        <ListItemText> {"u.location.country"}
          <Divider />
        </ListItemText>
      </ListItemText>
      {!isAuth && !params.userId ?
        <Box></Box>
        : <Box>
          {user.followed ?
            <Button variant="outlined"
                    size="small"
                    disabled={followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                      unfollowUser(user.id);
                    }}>

              Unfollow</Button>
            : <Button variant="outlined"
                      size="small"
                      disabled={followingInProgress.some((id: number) => id === user.id)}
                      onClick={() => {
                        followUser(user.id);
                      }}>Follow
            </Button>}
        </Box>}


    </ListItem>

  );
};

