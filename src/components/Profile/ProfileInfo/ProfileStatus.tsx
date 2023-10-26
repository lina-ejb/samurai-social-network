import { Box, Input, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { updateStatus } from "../../../redux/profile-reducer";
import { useAppDispatch } from "../../../redux/store";

type ProfileStatusType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onBlurCallback = () => {
    // выключить editMode при нажатии за пределами инпута

    setEditMode(false);
    dispatch(updateStatus(status))

  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <Box sx={{
      fontSize: "20px",
      lineHeight: "1.5",
      color: "#3d2f45",
      paddingTop: "10px"
    }}>
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

// export class ProfileStatus extends React.Component<ProfileStatusType> {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         })
//     }
//     clickCallBack = () => {
//         this.setState(({
//             editMode: false
//         }));
//         this.props.updateStatus(this.state.status)
//     }
//     onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             status: e.currentTarget.value
//         })
//     }
//     componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
//         if (prevProps.status !== this.props.status) {
//         this.setState({
//             status: this.props.status
//         })
//     }}
//
//     render() {
//         return (
//             <Box sx={{
//                 fontSize: '20px',
//                 lineHeight: '1.5',
//                 color: '#3d2f45',
//                 paddingTop: '10px'
//             }}>
//                 {!this.state.editMode &&
//                     <Typography variant="h6" component="h6">
//                         {/*  <DrawIcon onDoubleClick={this.activateEditMode}/>*/}
//                         <Box onDoubleClick={this.activateEditMode}>{this.props.status || 'there is no status'}</Box>
//                     </Typography>
//                 }
//                 {
//                     this.state.editMode &&
//                     <div>
//                         <Input
//                             onChange={this.onStatusChange}
//                             value={this.state.status}
//                             onBlur={this.clickCallBack}
//                             autoFocus={true}/>
//                     </div>
//                 }
//
//             </Box>
//         )
//
//     }
// }
