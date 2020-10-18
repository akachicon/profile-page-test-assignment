import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
  },
}));

export default function PageHeader({ children }) {
  const cls = useStyles();

  return <Typography className={cls.header}>{children}</Typography>;
}
