import React from 'react';
import {Box, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


type HeaderPropsType = {
    login?: string | null
    auth?: boolean | undefined
}
const Header = (props: HeaderPropsType) => {

    const navigate = useNavigate()

    return (
        < >
            <AppBar sx={{ background: '#2B6E99',
            }}>
                <Toolbar>
                    <img alt='logo'
                         src='https://img.logoipsum.com/235.svg'/>
                    <Typography variant="h6" sx={{ margin: 'auto' }}>

                    </Typography>
                    <Box>
                        {props.auth ? props.login :   <Button
                            size="small"
                            variant="contained" color="success"
                            component="button"
                            onClick={() => {
                                navigate('/profile')
                            }}
                        >Login</Button>}

                    </Box>
                </Toolbar>
            </AppBar>
        </>

    )
};

export default Header;