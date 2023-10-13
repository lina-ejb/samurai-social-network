import React from 'react';
import {Box, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

type HeaderPropsType = {
    login?: string | null
    isAuth?: boolean | undefined
    logOut?: () => void
}

const Header = (props: HeaderPropsType) => {
    const navigate = useNavigate()

    return (

        < >
            <AppBar sx={{
                background: '#2B6E99',
            }}>
                <Toolbar>
                    <img alt='logo'
                         src='https://img.logoipsum.com/235.svg'/>
                    <Typography variant="h6" sx={{margin: 'auto'}}>
                    </Typography>
                    <Box sx={{
                        '& .css-0': {
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center'
                        },
                    }}>
                        {props.isAuth
                            ? <Box>{props.login}<Button
                                size="small"
                                variant="contained" color="success"
                                component="button"
                                onClick={props.logOut}
                            >Log out</Button></Box> : <Box><Button
                                size="small"
                                variant="contained" color="success"
                                component="button"
                                onClick={() => navigate('/login')}
                            >Log in</Button>
                            </Box>}

                    </Box>
                </Toolbar>
            </AppBar>
        </>

    )
};

export default Header;