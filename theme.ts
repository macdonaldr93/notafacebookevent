import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#445760',
    },
    secondary: {
      main: '#959fa5',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      letterSpacing: '-3px',
    },
  },
});
