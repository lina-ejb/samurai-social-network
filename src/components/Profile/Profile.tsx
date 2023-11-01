import React, { useEffect, useState } from "react";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { GetUsersResponseType } from "../../api/api";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { getProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { Navigate, useParams } from "react-router-dom";


export default function Profile() {

  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const profile = useAppSelector<GetUsersResponseType | null>((state) => state.profile.profile);
  const status = useAppSelector<string>((state) => state.profile.status);
  const authorisedUserID = useAppSelector<number | null>((state) => state.userAuth.id);
  const isAuth = useAppSelector<boolean>((state) => state.userAuth.isAuth);
  const { userId } = useParams();

  useEffect(() => {

    if (Number(userId)) {
      dispatch(getProfile(userId as unknown as number) as AppThunkDispatch);
      dispatch(getStatus(userId as unknown as number) as AppThunkDispatch);
      setIsOwner(false);
    }
    if ((userId === undefined || userId === null) && isAuth) {
      dispatch(getProfile(authorisedUserID as number) as AppThunkDispatch);
      dispatch(getStatus(authorisedUserID as number) as AppThunkDispatch);
      setIsOwner(true);
      return;
    }

  }, [userId, authorisedUserID, dispatch, isAuth]);


  if (!isAuth && !userId) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
      />
      {!editMode && isOwner && <MyPostsContainer />}
    </div>
  );
};
