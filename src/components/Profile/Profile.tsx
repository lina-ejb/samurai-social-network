import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {GetUsersResponseType} from "../../api/api";
import {Box} from "@mui/material";


export type ProfilePropsType = {
    profile: GetUsersResponseType | null
    status:  string
    updateStatus: (status: string | boolean) => void
}
export const Profile = (props: ProfilePropsType) => {

    return (
        <Box
            sx={{
                '& .makeStyles-root-2': {
                    padding: '20px 50px',
                },
            }}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </Box>
    )

}

