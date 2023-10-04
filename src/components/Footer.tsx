import React, {PropsWithChildren} from 'react';
import { Box, useTheme } from '@mui/material';

export const Footer = function ({children}: PropsWithChildren<unknown>) {
    const theme = useTheme();


    return (
        <Box  sx={{
            backgroundColor: '#2B6E99',
            color: '#9CD4C7',
            fontWeight: '500',
            padding: theme.spacing(2),
            textAlign: 'center',
        }}>
            { children }
            {'© 2023 Minsk, Belarus'}
        </Box>
    );
};

// #25476a
//#5C80BC