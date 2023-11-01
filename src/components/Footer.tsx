import React, {PropsWithChildren} from 'react';
import { Box, useTheme } from '@mui/material';

export const Footer = function ({children}: PropsWithChildren<unknown>) {
    const theme = useTheme();


    return (
        <Box  id={'footerBox'} sx={{
          backgroundColor: "var(--background)",
            color: '#fff',
            fontWeight: '500',
            padding: theme.spacing(2),
            textAlign: 'center',
        }}>
            { children }
            {'© 2023 Minsk, Belarus'}
        </Box>
    );
};

