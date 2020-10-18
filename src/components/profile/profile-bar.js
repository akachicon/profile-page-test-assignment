import React, { useContext } from 'react';
import {
  makeStyles,
  Paper,
  Grid,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';
import { Edit as EditIcon, Close as CloseIcon } from '@material-ui/icons';
import { LocalDataContext } from '@/lib/local-data-context';
import useSmallScreenMatch from '@/hooks/use-small-screen-match';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  grid: {
    padding: theme.spacing(3),
  },
  userInfo: {
    width: 'initial',
  },
  avatar: {
    width: 80,
    height: 80,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
  },
  userName: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize * 2,
    fontWeight: theme.typography.fontWeightBold,
  },
  buttonWrapper: {
    padding: `0 ${theme.spacing(2)}`,
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonCaption: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      marginBottom: theme.spacing(1),
    },
    grid: {
      padding: `${theme.spacing(2)}px 0`,
    },
    userInfo: {
      width: 'initial',
    },
    avatar: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1),
    },
    userName: {
      fontSize: theme.typography.body1.fontSize,
    },
    button: {
      minWidth: theme.spacing(6),
      width: theme.spacing(6),
    },
    buttonWrapper: {
      paddingRight: theme.spacing(1),
    },
  },
}));

export default function ProfileBar({ isEditing, onEditClick }) {
  const cls = useStyles();
  const smallScreen = useSmallScreenMatch();
  const { user } = useContext(LocalDataContext);

  const { name } = user;

  const icon = isEditing ? (
    <CloseIcon className={cls.buttonIcon} />
  ) : (
    <EditIcon className={cls.buttonIcon} />
  );

  return (
    <Paper className={cls.container} elevation={25}>
      <Grid
        className={cls.grid}
        container
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          className={cls.userInfo}
          item
          container
          wrap="nowrap"
          alignItems="center"
        >
          <Grid item>
            <Avatar
              className={cls.avatar}
              src="/user-medium.svg"
              alt="Аватар"
            />
          </Grid>

          <Grid className={cls.userName} item>
            {name}
          </Grid>
        </Grid>

        <Grid className={cls.buttonWrapper} item>
          <Button
            className={cls.button}
            onClick={onEditClick}
            disableRipple
            disableFocusRipple
            endIcon={!smallScreen && icon}
          >
            {smallScreen ? (
              icon
            ) : (
              <Typography className={cls.buttonCaption}>
                {isEditing ? 'закрыть' : 'редактировать'}
              </Typography>
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
