import React from "react";
import {ProfilePropsType} from "../Profile";
import s from './ProfileInfo.module.css'
import img from './profileIMG.png'
import {LoaderMu} from "../../Users/LoaderMU";
import {Avatar, Box} from "@mui/material";
import {ProfileStatus} from './ProfileStatus'

export const ProfileInfo = (props: ProfilePropsType) => {

    if (!props.profile) {
        return <LoaderMu/>
    }

    return <>
        <div className={s.profileImage}>
            <img src={img} alt="img"/>
        </div>
        <Box className={s.imgContainer}>
            <Avatar src={props.profile?.photos.large} sx={{width: 200, height: 200}}/>
            <ProfileStatus status={props.status}
                           updateStatus={props.updateStatus}
            />
        </Box>

    </>


}