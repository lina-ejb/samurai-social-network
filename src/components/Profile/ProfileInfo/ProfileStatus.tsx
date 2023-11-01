import { Box, Input, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { updateStatus } from "../../../redux/profile-reducer";
import { useAppDispatch } from "../../../redux/store";
import { useParams } from "react-router-dom";

type ProfileStatusType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);
  const { userId } = useParams();

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    if (Number(!userId)) {
      setEditMode(true);
    }
  };

  const onBlurCallback = () => {
    // выключить editMode при нажатии за пределами инпута

    setEditMode(false);
    dispatch(updateStatus(status));

  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <Box >
      {!editMode &&
        <Typography variant="h6" component="h6">
          <Box onDoubleClick={activateEditMode}>{props.status || "there is no status"}</Box>
        </Typography>
      }
      {editMode &&
        <Box>
          <Input
            value={status}
            autoFocus={true}
            onBlur={onBlurCallback}
            onChange={onStatusChange}
          />
        </Box>
      }
    </Box>
  );
};

