import React, {ChangeEvent} from 'react';
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {UsersPropsType} from "./UsersContainer";
import Pagination from "@mui/material/Pagination";
import {Loader} from "./Loader";
import Link from "@mui/material/Link";
import {usersAPI} from "../../api/api";


export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });

    }

    handleChange = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)

            });
    }
    unfollowUser = (id: number) => {
        this.props.toggleFollowingProgress(true, id)
        this.props.toggleIsFetching(true)
        usersAPI.deleteFollower(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.unfollow(id)
                }
                this.props.toggleIsFetching(false)
                this.props.toggleFollowingProgress(false, id)
            });
    }

    followUser = (id: number) => {
        this.props.toggleFollowingProgress(true, id)
        this.props.toggleIsFetching(true)
        usersAPI.addFollower(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.follow(id)
                }
                this.props.toggleIsFetching(false)
                this.props.toggleFollowingProgress(false, id)
            })
    }

    render() {
        const pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        return (

            <div>
                {this.props.isLoading ? null : <Loader/>}
                <Pagination count={pageCount} color="primary"
                            onChange={(event: ChangeEvent<unknown>, value) => {
                                this.handleChange(value)
                            }}
                            sx={{
                                '& .MuiPagination-ul': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingTop: '10px',
                                },
                            }}/>

                {this.props.users.users.map(u => <ListItem key={u.id} alignItems="flex-start">
                    <Link href={'/profile/' + u.id}>
                        <ListItemAvatar>
                            <Avatar src={u.photos.small != null ? u.photos.small : "/static/images/avatar/1.jpg"}/>

                        </ListItemAvatar>
                    </Link>


                    <ListItemText>{u.name}
                        <Typography color="text.primary">{u.status}</Typography>
                        <Typography> {"u.location.city"}</Typography>
                        <ListItemText> {'u.location.country'}
                            <Divider/>
                        </ListItemText>
                    </ListItemText>
                    {u.followed ?
                        <Button variant="outlined"
                                size="small"
                                disabled={this.props.followingInProgress.some((id: number)  => id === u.id)}
                                onClick={() => {
                                    this.unfollowUser(u.id)
                                }}>

                            Unfollow</Button>
                        : <Button variant="outlined"
                                  size="small"
                                  disabled={this.props.followingInProgress.some((id: number)  => id === u.id)}
                                  onClick={() => {
                                      this.followUser(u.id)
                                  }}>Follow
                        </Button>}
                </ListItem>)}


            </div>
        )
    }
}
