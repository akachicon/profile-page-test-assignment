import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1A78C2',
    },
    secondary: {
      main: '#00BFA5',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightBold: 600,
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          minHeight: '-webkit-fill-available',
          fallbacks: [{ minHeight: '-moz-available' }, { minHeight: '100vh' }],
        },
      },
    },
  },
});

theme.shadows[25] = '0px 4px 10px rgba(0, 0, 0, 0.15)';

theme.typography.body1 = {
  fontFamily: theme.typography.fontFamily,
  fontSize: 18,
  lineHeight: '25px',
  letterSpacing: '0.00938em',
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
    lineHeight: '19px',
    letterSpacing: '0.01071em',
  },
};

theme.typography.body2 = {
  fontFamily: theme.typography.fontFamily,
  fontSize: 14,
  lineHeight: '19px',
  letterSpacing: '0.01071em',
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.01130em',
  },
};

export default theme;
