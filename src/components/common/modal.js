import { useMemo } from 'react';
import {
  makeStyles,
  Dialog,
  SwipeableDrawer,
  Paper,
  IconButton,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import clsx from 'clsx';
import useSmallScreenMatch from '@/hooks/use-small-screen-match';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    transform: 'translate(0, -95px)',
  },
  drawerPaper: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dialogContainer: {
    minWidth: 600,
    minHeight: theme.spacing(40),
    borderRadius: theme.shape.borderRadius,
  },
  drawerContainer: {
    height: '77vh',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(8.5),
    paddingRight: theme.spacing(3),
    color: 'rgba(49, 49, 49, 0.7)',
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    content: {
      paddingTop: theme.spacing(8),
    },
    title: {
      fontSize: 18,
    },
  },
}));

// Drawer's onOpen prop is necessary.
const drawerOnOpen = () => {};

export const ModalTitle = ({ className, children }) => {
  const cls = useStyles();
  const classes = clsx(cls.title, className);

  return <span className={classes}>{children}</span>;
};

export default function Modal({
  open,
  onOpen,
  onExited,
  onClose,
  showCloseButton,
  children,
}) {
  const cls = useStyles();
  const smallScreen = useSmallScreenMatch();

  const SlideProps = useMemo(() => ({ in: open, onExited: onExited }), [
    open,
    onExited,
  ]);

  const drawerPaperProps = useMemo(() => ({ className: cls.drawerPaper }), [
    cls.drawerPaper,
  ]);

  const dialogPaperProps = useMemo(() => ({ className: cls.dialogPaper }), [
    cls.dialogPaper,
  ]);

  const closeButton = useMemo(
    () => (
      <IconButton className={cls.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ),
    [onClose]
  );

  return smallScreen ? (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen || drawerOnOpen}
      onClose={onClose}
      anchor={'bottom'}
      SlideProps={SlideProps}
      PaperProps={drawerPaperProps}
      variant="temporary"
      disableDiscovery
      disableSwipeToOpen
      disableBackdropTransition
    >
      <Paper className={cls.drawerContainer}>
        {showCloseButton && closeButton}
        <div className={cls.content}>{children}</div>
      </Paper>
    </SwipeableDrawer>
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      onExited={onExited}
      PaperProps={dialogPaperProps}
    >
      <Paper className={cls.dialogContainer}>
        {showCloseButton && closeButton}
        <div className={cls.content}>{children}</div>
      </Paper>
    </Dialog>
  );
}
