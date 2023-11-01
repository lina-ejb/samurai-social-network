import React from "react";
import { ProfileDataType } from "./ProfileInfo";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch } from "../../../redux/store";
import { saveProfile } from "../../../redux/profile-reducer";
import { ProfileFormType } from "../../../api/api";


export const ProfileDataForm: React.FC<ProfileDataType> = ({
                                                             profile,
                                                             setEditMode,
                                                             isOwner,
                                                             activateEditMode
                                                           }) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({


    initialValues: {
      fullName: profile?.fullName || "",
      lookingForAJob: profile?.lookingForAJob || false,
      lookingForAJobDescription: profile?.lookingForAJobDescription || "",
      aboutMe: profile?.aboutMe || "",
      contacts: {
        vk: profile?.contacts.vk || "",
        twitter: profile?.contacts.twitter || "",
        website: profile?.contacts.website || "",
        github: profile?.contacts.github || "",
        mainLink: profile?.contacts.mainLink || "",
        youtube: profile?.contacts.youtube || "",
        facebook: profile?.contacts.facebook || "",
        instagram: profile?.contacts.instagram || ""
      }
    },

    onSubmit: async (values) => {
      await dispatch(saveProfile(values) as any);
      if (setEditMode) {
        setEditMode(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormGroup>

          <Box className={"profileInfoAboutMeContainer"}>

            <Box className={"aboutMeContainer"}>
              <div><Button type={"submit"}>save</Button></div>
              <label htmlFor="fullName">
                <Box><b>Full name:</b> </Box>
                <TextField
                  label="Full name"
                  margin="normal"
                  {...formik.getFieldProps("fullName")}
                />
              </label>

              <Box>
                <FormControlLabel
                  label="Did youre looking for a job?"
                  control={
                    <Checkbox
                      {...formik.getFieldProps("lookingForAJob")}
                      checked={formik.values.lookingForAJob}
                    />
                  }
                />
              </Box>

              <label htmlFor={"professionalSkill"}>
                <Box><b>Professional skill:</b> </Box>
                <TextField
                  id={"professionalSkill"}
                  label="Professional skill"
                  margin="normal"
                  {...formik.getFieldProps("lookingForAJobDescription")}
                />
              </label>


              <label htmlFor={"aboutMe"}>
                <Box><b>About me:</b> </Box>
                <TextField
                  label="About me..."
                  {...formik.getFieldProps("aboutMe")}
                />
              </label>

              <Box className={"profileContactsContainer"}><b>Contacts</b>
                <Box className={"profileDataContacts"}>
                  {profile &&
                    Object.keys(profile.contacts).map((key) => {
                      return <Box key={key}>
                        <b>{key} :</b>
                        <TextField
                          id="contacts"
                          type={"url"}
                          label={key}
                          {...formik.getFieldProps(`contacts.${key}`)}
                        />

                      </Box>;
                    })}

                </Box>
              </Box>
            </Box>
          </Box>
        </FormGroup>

      </FormControl>

    </form>
  );
};