import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {GetUsersResponseType} from "../../api/api";


export type ProfilePropsType = {
    profile: GetUsersResponseType | null
}
export const Profile = (props: ProfilePropsType) => {

    return (
        <main>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </main>
    )

}

