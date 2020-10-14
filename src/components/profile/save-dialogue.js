import { useContext, useRef, useCallback, useMemo } from 'react';
import useState from 'react-use-batched-state';
import { Dialog, Backdrop } from '@material-ui/core';
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

export default function SaveDialogue({ open, onClose: onCloseProp, userData }) {
  const { updateUser } = useContext(LocalDataContext);
  const [state, setState] = useState(ACKNOWLEDGEMENT);

  const stateRef = useRef(state);
  stateRef.current = state;

  const onClose = useCallback(() => onCloseProp(stateRef.current), [
    onCloseProp,
  ]);

  const onExited = useCallback(() => setState(ACKNOWLEDGEMENT), []);

  const onSave = useCallback(() => {
    setState(SAVING);

    minDelay(
      api.request('/api/profile-update', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
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

  const dialogueComponent = useMemo(() => {
    switch (state) {
      case ACKNOWLEDGEMENT:
        return (
          <>
            Сохранить изменения?
            <button onClick={onSave}>Сохранить</button>
            <button onClick={onClose}>Не сохранять</button>
          </>
        );

      case SAVING:
        return <>Идет сохранение...</>;

      case SAVED:
        return (
          <>
            Данные сохранены
            <button onClick={onClose}>Хорошо</button>
          </>
        );

      case ERROR:
        return (
          <>
            Произошла ошибка. Попробуйте позже или обратитесь в поддержку.
            <button onClick={onClose}>Закрыть</button>
          </>
        );
    }
  }, [state, onSave, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onExited={onExited}
      BackdropComponent={Backdrop}
    >
      <>
        <button onClick={onClose}>close</button>
        {dialogueComponent}
      </>
    </Dialog>
  );
}
