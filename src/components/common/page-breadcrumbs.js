import { makeStyles, Breadcrumbs, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    breadcrumbs: {
      marginBottom: theme.spacing(1),
    },
  },
}));

export default function PageHeader({ children }) {
  const cls = useStyles();

  return (
    <Breadcrumbs className={cls.breadcrumbs}>
      {children.map((child, idx) => (
        <Typography key={idx} variant="body2">
          {child}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}
