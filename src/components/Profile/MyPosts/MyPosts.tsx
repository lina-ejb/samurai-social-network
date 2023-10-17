import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import {Button, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {PostsPropsType} from "./MyPostsContainer";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '50px'
    },
})

export const MyPosts = (props: PostsPropsType) => {
    const classes = useStyles()
    const addPostHandler = () => {
        props.addPost()
    }

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }

    const mappedPosts = props.postsState.posts.map((el) => (
        <Post
            key={el._id}
            message={el.message}
            id={el._id}
            likeCounter={el.likeCounter}/>))
    return (
        <div className={classes.root}>
            <h3>My posts</h3>
            <div>
                <TextField
                    value={props.postsState.newPostMessage}
                    onChange={newTextHandler}>
                </TextField>
            </div>
            <Button onClick={addPostHandler} variant="outlined" sx={{ inlineSize: 'fit-content' }}>Add post</Button>

            <div>
                {mappedPosts}
            </div>
        </div>
    )
}


