import React, { useContext } from 'react';
import {
  makeStyles,
  Container,
  Toolbar,
  Grid,
  Avatar,
  Divider,
} from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';
import useSmallScreenMatch from '@/hooks/use-small-screen-match';
import { LocalDataContext } from '@/lib/local-data-context';
import { shortenUserName } from '@/lib/utils';
import Wave from './wave';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    maxWidth: 1365,
  },
  toolbar: {
    marginBottom: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.contrastText,
  },
  avatar: {
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  notificationIcon: {
    display: 'block',
    width: 30,
    height: 35,
    cursor: 'pointer',
  },
  divider: {
    display: 'block',
    color: 'white',
    backgroundColor: 'white',
    height: 39,
    border: 'none',
  },
  name: {
    display: 'block',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: 0,
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    toolbar: {
      padding: theme.spacing(1),
    },
    avatar: {
      width: 24,
      height: 24,
    },
    notificationIcon: {
      width: 22,
      height: 25,
    },
    divider: {
      height: 24,
    },
    name: {
      display: 'none',
    },
  },
}));

export default function Layout({ children }) {
  const cls = useStyles();
  const smallScreen = useSmallScreenMatch();
  const { user } = useContext(LocalDataContext);

  const { name } = user;
  const gridGutter = smallScreen ? 1 : 2;

  return (
    <>
      <Wave />
      <Container className={cls.container}>
        <Toolbar className={cls.toolbar}>
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            spacing={gridGutter}
          >
            <Grid item>
              <NotificationsNone className={cls.notificationIcon} />
            </Grid>

            <Grid item>
              <Divider className={cls.divider} orientation="vertical" />
            </Grid>

            <Grid item>
              <Avatar
                className={cls.avatar}
                src="/user-small.svg"
                alt="Аватар"
              />
            </Grid>

            <Grid className={cls.name} item>
              {shortenUserName(name)}
            </Grid>
          </Grid>
        </Toolbar>
        {children}
      </Container>
    </>
  );
}
