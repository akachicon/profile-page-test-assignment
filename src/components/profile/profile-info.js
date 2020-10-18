import { useContext, useCallback } from 'react';
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  AlternateEmail as EmailIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import { LocalDataContext } from '@/lib/local-data-context';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
  },
  item: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(9),
    paddingBottom: theme.spacing(4),
  },
  icon: {
    color: theme.palette.secondary.main,
    width: 35,
    height: 35,
  },
  iconWrapper: {
    minWidth: 35,
    marginRight: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    item: {
      paddingTop: theme.spacing(2.5),
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(2.5),
    },
    iconWrapper: {
      marginRight: 0,
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 0,
    },
  },
}));

export default function ProfileInfo() {
  const cls = useStyles();
  const { user } = useContext(LocalDataContext);
  const { email, phoneNumber } = user;

  const getListItem = useCallback(
    (text, Icon) => (
      <ListItem className={cls.item}>
        <ListItemIcon className={cls.iconWrapper}>
          <Icon className={cls.icon} />
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    ),
    [cls]
  );

  return (
    <Paper elevation={25}>
      <List className={cls.list}>
        {getListItem(email, EmailIcon)}
        <Divider />
        {getListItem(phoneNumber, PhoneIcon)}
      </List>
    </Paper>
  );
}
