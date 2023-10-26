import React, { ChangeEvent } from "react";
import Post from "./Post/Post";
import { Box, Button, TextField } from "@mui/material";
import { PostsPropsType } from "./MyPostsContainer";
import "./PlainCssMyPost.css";

export const MyPosts = React.memo((props: PostsPropsType) => {

  const addPostHandler = () => {
    props.addPost();
  };

  const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    props.updateNewPostText(text);
  };

  const mappedPosts = props.postsState.posts.map((el) => (
    <Post
      key={el._id}
      message={el.message}
      id={el._id}
      likeCounter={el.likeCounter} />));
  return (
    <Box className='postClass'>
      <h3>My posts</h3>
      <div>
        <TextField
          value={props.postsState.newPostMessage}
          onChange={newTextHandler}>
        </TextField>
      </div>
      <Button onClick={addPostHandler} variant="outlined" sx={{ inlineSize: "fit-content" }}>Add post</Button>

      <div>
        {mappedPosts}
      </div>
    </Box>
  );
});


