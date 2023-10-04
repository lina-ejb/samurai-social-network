import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export const LoaderMu = () => {

    return (

            <Box sx={{ width: '100%', position:'absolute', zIndex: '1000' }}>
                <LinearProgress />
            </Box>

    );
};

