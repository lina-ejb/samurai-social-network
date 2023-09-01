import React, {PropsWithChildren} from 'react';
import { Box, useTheme } from '@mui/material';

export const Footer = function ({children}: PropsWithChildren<unknown>) {
    const theme = useTheme();


    return (
        <Box  sx={{
            backgroundColor: '#25476a',
            color: '#4f9e91',
            fontWeight: '500',
            padding: theme.spacing(2),
            textAlign: 'center',
        }}>
            { children }
            {'© 2023 Minsk, Belarus'}
        </Box>
    );
};

