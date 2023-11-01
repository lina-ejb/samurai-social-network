import React, { ChangeEvent, useEffect, useState } from "react";
import "./PlainCssProfileInfo.css";
import img from "../../../assets/images/profileIMG.png";
import { Preloader } from "../../common/Preloader/Preloader";
import { Avatar, Box, Button, Divider } from "@mui/material";
import { ProfileStatus } from "./ProfileStatus";
import { ConstactsType, GetUsersResponseType } from "../../../api/api";
import { savePhoto } from "../../../redux/profile-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import "../../Layout/LayoutApp.module.css";
import { ProfileDataForm } from "./ProfileDataForm";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export type ProfilePropsType = {
  profile: GetUsersResponseType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
}

export const ProfileInfo: React.FC<ProfilePropsType> = ({
                                                          profile,
                                                          status,
                                                          updateStatus,
                                                          isOwner

                                                        }) => {

  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const lightMode = useAppSelector((state) => state.app.isLightMode);
  const profileImg = document.querySelector<HTMLElement>(".profileImage");


  useEffect(() => {
    let theme = localStorage.getItem("lightMode");
    setTheme(theme);
  });


  if (!profile) {
    return <Preloader />;
  }
  if (theme) {
    if (profileImg) {
      profileImg.dataset.themeimg = lightMode + "";
    }
  }

  const mainPhotoChooser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };


  return <>
    <Box className="profileImage"><img src={img} alt="img" id={"profileIMG"} />
    </Box>
    <Box className="profileContainer">
      <Box className={"profileInfoContainer"}>
        <Box className={"profileInfoMainContainer"}>
          <Avatar src={profile?.photos.large} className="profileAvatar" />
          <Box>
            {isOwner &&
              <Box className={"uploadBtnWrapper"}>
                {/*<Button className={"btn"}>Upload photo</Button>*/}
                <AddAPhotoIcon />
                <input type={"file"} id={"upload-photo"} onChange={mainPhotoChooser} accept="image/*" />
              </Box>}
            <ProfileStatus status={status}
                           updateStatus={updateStatus}
            />
          </Box>
        </Box>

        <Box className={"profileInfoEditContainer"}>
          {editMode ?
            <ProfileDataForm
              setEditMode={setEditMode}
              profile={profile}
            /> :
            <ProfileData
              activateEditMode={() => {
                setEditMode(true);
              }}
              isOwner={isOwner}
              profile={profile}
            />}
        </Box>
      </Box>
      <Divider className={"divider"} />
    </Box>
  </>;
};

export type ProfileDataType = {
  profile: GetUsersResponseType | null
  isOwner?: boolean
  activateEditMode?: (e: React.MouseEvent<HTMLElement>) => void
  setEditMode?: (value: boolean) => void
}

const ProfileData: React.FC<ProfileDataType> = ({
                                                  profile,
                                                  isOwner,
                                                  activateEditMode
                                                }) => {

  const [show, setShow] = useState(false);
  let btnText = !show ? 'Click to see the contacts' : 'contacts'
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Box className={"profileInfoAboutMeContainer"}>

      <Box className={"aboutMeContainer"}>
        <div>{isOwner && <Button onClick={activateEditMode}>edit profile</Button>}</div>
        <Box className={"fullName"}>{profile?.fullName}</Box>
        <Box><b>Looking for a job:{" "}</b>

          {profile?.lookingForAJob ? "Yes" : " No"}
        </Box>
        {profile?.lookingForAJob &&
          <Box>
            <b>My professional skills:{" "}</b> {profile?.lookingForAJobDescription}
          </Box>
        }
        <Box><b>About me:{" "}</b>
          {profile?.aboutMe}
        </Box>
        <Box className={"profileContacts"}> <Button onClick={toggleShow}>{btnText}</Button>
          <Box>
            {show && profile && Object.keys(profile.contacts).map((key) => {
              return <Contact key={key} contactTitle={key}
                              contactValue={profile?.contacts[key as keyof ConstactsType] || ""} />;
            })}

          </Box>
        </Box>


      </Box>

    </Box>
  );

};


type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({
                                                      contactTitle,
                                                      contactValue
                                                    }) => {
  return <div>
    <b>{contactTitle}</b> : {contactValue}
  </div>;

};