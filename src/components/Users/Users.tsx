import React, { ChangeEvent } from "react";
import { UsersPropsType } from "./UsersContainer";
import { LoaderMu } from "./LoaderMU";
import {
  Avatar,
  Button,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";


export class Users extends React.Component<UsersPropsType> {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  handleChange = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);

  };
  unfollowUser = (id: number) => {
    this.props.unFollowUser(id);

  };

  followUser = (id: number) => {
    this.props.followUser(id);

  };

  render() {

    const pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    return (

      <div>
        {this.props.isLoading ? null : <LoaderMu />}
        <Pagination count={pageCount} color="primary"
                    onChange={(event: ChangeEvent<unknown>, value) => {
                      this.handleChange(value);
                    }}
                    sx={{
                      "& .MuiPagination-ul": {
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "10px"
                      }
                    }} />

        {this.props.users.users.map(u => <ListItem key={u.id} alignItems="flex-start">

          <Link href={"/profile/" + u.id}>
            <ListItemAvatar>
              <Avatar src={u.photos.small != null ? u.photos.small : "/static/images/avatar/1.jpg"} />

            </ListItemAvatar>
          </Link>


          <ListItemText>{u.name}
            <Typography color="text.primary">{u.status}</Typography>
            <Typography> {"u.location.city"}</Typography>
            <ListItemText> {"u.location.country"}
              <Divider />
            </ListItemText>
          </ListItemText>
          {!this.props.isAuth && !this.props.params.userId ?
            <Box></Box>
            : <Box>
              {u.followed ?
                <Button variant="outlined"
                        size="small"
                        disabled={this.props.followingInProgress.some((id: number) => id === u.id)}
                        onClick={() => {
                          this.unfollowUser(u.id);
                        }}>

                  Unfollow</Button>
                : <Button variant="outlined"
                          size="small"
                          disabled={this.props.followingInProgress.some((id: number) => id === u.id)}
                          onClick={() => {
                            this.followUser(u.id);
                          }}>Follow
                </Button>}
            </Box>}


        </ListItem>)}
      </div>
    );
  }
}
