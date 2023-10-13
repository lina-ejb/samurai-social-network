import React, {ChangeEvent} from 'react';
import {Box, Input, Typography} from "@mui/material";

type ProfileStatusType = {
    status: string
    updateStatus: (status: string | boolean) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    clickCallBack = () => {
        this.setState(({
            editMode: false
        }));
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
        this.setState({
            status: this.props.status
        })
    }}

    render() {

        return (
            <Box sx={{
                fontSize: '20px',
                lineHeight: '1.5',
                color: '#3d2f45',
                paddingTop: '10px'
            }}>


                {!this.state.editMode &&
                    <Typography variant="h6" component="h6">
                        {/*  <DrawIcon onDoubleClick={this.activateEditMode}/>*/}
                        <Box onDoubleClick={this.activateEditMode}>{this.props.status || 'there is no status'}</Box>
                    </Typography>
                }
                {
                    this.state.editMode &&
                    <div>
                        <Input
                            onChange={this.onStatusChange}
                            value={this.state.status}
                            onBlur={this.clickCallBack}
                            autoFocus={true}/>
                    </div>
                }

            </Box>
        )

    }
}