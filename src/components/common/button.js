import { makeStyles, Button as MuiButton } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  button: {
    boxSizing: 'border-box',
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    width: 212,
    height: 50,
    borderRadius: 25,
    textTransform: 'none',
    transition: 'background .2s, color .2s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.grey[200],
    },
  },
  outlined: {
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: '#effcf9',
      color: theme.palette.secondary.dark,
    },
  },
  modal: {
    width: 202,
  },
}));

export default function Button({
  className,
  outlined,
  modal,
  children,
  ...other
}) {
  const cls = useStyles();

  const classes = clsx([
    cls.button,
    {
      [cls.outlined]: outlined,
      [cls.modal]: modal,
    },
    className,
  ]);

  return (
    <MuiButton className={classes} disableElevation {...other}>
      {children}
    </MuiButton>
  );
}
