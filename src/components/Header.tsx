import React from 'react';
import {Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";

const Header = () => {

    return (
        < >
            <AppBar sx={{ background: '#25476a',
            }}>
                <Toolbar>
                    <img alt='logo'
                         src='https://img.logoipsum.com/235.svg'/>
                    <Typography variant="h6" sx={{ margin: 'auto' }}>

                    </Typography>
                </Toolbar>
            </AppBar>
        </>

    )
};

export default Header;