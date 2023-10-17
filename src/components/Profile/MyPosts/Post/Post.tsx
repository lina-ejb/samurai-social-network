import React from "react";
import s from "./Post.module.css";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Box } from "@mui/material";

type PostPropsType = {
    message: string
    likeCounter: number
    id: number
};

const Post = (props: PostPropsType) => {

    return (
        <div>
            <div className={s.posts}>
                <div className={s.item}>
                    <img alt ='profile_picture' src='https://github.com/travis-ci.png'/>
                    {props.message}</div>
                <Box>
                    <FavoriteTwoToneIcon color={'error'} fontSize={'small'}/> {props.likeCounter}
                </Box>
            </div>

        </div>
    )


}

export default Post
