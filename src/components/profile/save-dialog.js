import { useContext, useRef, useCallback, useMemo } from 'react';
import useState from 'react-use-batched-state';
import { makeStyles, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import Modal, { ModalTitle } from '@/components/common/modal';
import Button from '@/components/common/button';
import { LocalDataContext } from '@/lib/local-data-context';
import minDelay from '@/lib/min-delay';
import api from '@/lib/api';
import logger, { levels } from '@/lib/logger';
import { HttpError } from '@/lib/errors';

const ACKNOWLEDGEMENT = 'acknowledgement';
const SAVING = 'saving';
const SAVED = 'saved';
const ERROR = 'error';

export const stateMap = {
  ACKNOWLEDGEMENT,
  SAVING,
  SAVED,
  ERROR,
};

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  successTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  savingTitle: {
    marginBottom: theme.spacing(7),
  },
  errorTitle: {
    marginBottom: theme.spacing(2),
  },
  saveButton: {
    marginBottom: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(5),
    fontSize: theme.typography.body1,
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      marginBottom: theme.spacing(5),
    },
    errorTitle: {
      marginBottom: theme.spacing(3),
    },
    text: {
      fontSize: 14,
    },
  },
}));

const DialogTitle = ({ className, children, ...other }) => {
  const cls = useStyles();
  const classes = clsx(cls.title, className);

  return (
    <ModalTitle className={classes} {...other}>
      {children}
    </ModalTitle>
  );
};

const DialogButton = ({ className, children, ...other }) => {
  const cls = useStyles();
  const classes = clsx(cls.button, className);

  return (
    <Button className={classes} {...other}>
      {children}
    </Button>
  );
};

export default function SaveDialog({ open, onClose: onCloseProp, userData }) {
  const cls = useStyles();
  const { updateUser } = useContext(LocalDataContext);
  const [state, setState] = useState(ACKNOWLEDGEMENT);

  const stateRef = useRef(state);
  stateRef.current = state;

  const onClose = useCallback(() => {
    onCloseProp(stateRef.current);
  }, [onCloseProp]);

  const onExited = useCallback(() => {
    setState(ACKNOWLEDGEMENT);
  }, []);

  const onSave = useCallback(() => {
    setState(SAVING);

    minDelay(
      api.request(
        '/api/profile-update',
        {
          method: 'POST',
          body: JSON.stringify(userData),
        },
        { timeout: 5000 }
      )
    ).then(
      () => {
        updateUser(userData);
        setState(SAVED);
      },
      (err) => {
        if (err instanceof HttpError) {
          logger.log(levels.ERROR, err);
        }
        setState(ERROR);
      }
    );
  }, [userData, updateUser]);

  const dialogComponent = useMemo(() => {
    switch (state) {
      case ACKNOWLEDGEMENT:
        return (
          <>
            <DialogTitle>Сохранить изменения?</DialogTitle>
            <DialogButton className={cls.saveButton} onClick={onSave}>
              Сохранить
            </DialogButton>
            <DialogButton outlined onClick={onClose}>
              Не сохранять
            </DialogButton>
          </>
        );

      case SAVING:
        return (
          <>
            <DialogTitle className={cls.savingTitle}>
              Идет сохранение...
            </DialogTitle>
            <CircularProgress color="secondary" />
          </>
        );

      case SAVED:
        return (
          <>
            <DialogTitle className={cls.successTitle}>
              Данные успешно сохранены
            </DialogTitle>
            <DialogButton onClick={onClose}>Хорошо</DialogButton>
          </>
        );

      case ERROR:
        return (
          <>
            <DialogTitle className={cls.errorTitle}>
              Произошла ошибка
            </DialogTitle>
            <span className={cls.text}>
              Попробуйте позже или обратитесь в поддержку.
            </span>
            <DialogButton onClick={onClose}>Закрыть</DialogButton>
          </>
        );
    }
  }, [
    state,
    onSave,
    onClose,
    cls.saveButton,
    cls.successTitle,
    cls.savingTitle,
    cls.errorTitle,
    cls.text,
  ]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      onExited={onExited}
      showCloseButton={state === ACKNOWLEDGEMENT}
    >
      <>{dialogComponent}</>
    </Modal>
  );
}
