import { useContext, useCallback, useMemo } from 'react';
import useState from 'react-use-batched-state';
import { TextField, Button } from '@material-ui/core';
import { name, email, phone } from '@/lib/validators';
import { LocalDataContext } from '@/lib/local-data-context';
import useValidatedInput from '@/hooks/use-validated-input';
import PhoneInput from './phone-input';
import SaveDialogue, { stateMap as dialogueStateMap } from './save-dialogue';

function getInputError(valid, touched, submitAttempted) {
  return !valid && (touched || submitAttempted);
}

const derivePhoneChangeValue = (val) => val;

export default function ProfileEditForm({ onAfterSubmit }) {
  const { user } = useContext(LocalDataContext);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  const defaultName = user?.name ?? '';
  const defaultEmail = user?.email ?? '';
  const defaultPhoneNumber = user?.phoneNumber ?? '';

  const nameInput = useValidatedInput(name, defaultName);
  const emailInput = useValidatedInput(email, defaultEmail);
  const phoneInput = useValidatedInput(
    phone,
    defaultPhoneNumber,
    derivePhoneChangeValue
  );

  const validateName = nameInput.validate;
  const validateEmail = emailInput.validate;
  const validatePhone = phoneInput.validate;

  const validateInputs = useCallback(() => {
    const isNameValid = validateName().isValid;
    const isEmailValid = validateEmail().isValid;
    const isPhoneValid = validatePhone().isValid;

    return isNameValid && isEmailValid && isPhoneValid;
  }, [validateName, validateEmail, validatePhone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const shouldSubmit = validateInputs();
      setSubmitAttempted(true);

      if (shouldSubmit) {
        setSubmitData({
          name: nameInput.value,
          email: emailInput.value,
          phoneNumber: phoneInput.value,
        });
      }
    },
    [nameInput, emailInput, phoneInput, validateInputs]
  );

  const onDialogueClose = useCallback(
    (dialogueState) => {
      const { SAVING, SAVED } = dialogueStateMap;

      // Prevent user from closing dialogue while saving.
      if (dialogueState === SAVING) return;

      if (dialogueState === SAVED) {
        onAfterSubmit();
      }

      setSubmitData(null);
    },
    [onAfterSubmit]
  );

  const InputProps = useMemo(() => ({ inputComponent: PhoneInput }), []);

  const nameError = getInputError(
    nameInput.valid,
    nameInput.touched,
    submitAttempted
  );
  const emailError = getInputError(
    emailInput.valid,
    emailInput.touched,
    submitAttempted
  );
  const phoneError = getInputError(
    phoneInput.valid,
    phoneInput.touched,
    submitAttempted
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        label="Фамилия и имя"
        placeholder="Иванов Иван"
        variant="outlined"
        inputProps={nameInput.inputProps}
        error={nameError}
        helperText={nameError && nameInput.errorHint}
        defaultValue={defaultName}
      />

      <TextField
        label="E-mail"
        placeholder="ivanov@mail.ru"
        variant="outlined"
        inputProps={emailInput.inputProps}
        error={emailError}
        helperText={emailError && emailInput.errorHint}
        defaultValue={defaultEmail}
      />

      <TextField
        type="tel"
        label="Номер телефона"
        placeholder="+7 999 999 99 99"
        variant="outlined"
        inputProps={phoneInput.inputProps}
        error={phoneError}
        helperText={phoneError && phoneInput.errorHint}
        InputProps={InputProps}
        value={phoneInput.value}
      />

      <Button type="submit" variant="contained">
        Сохранить
      </Button>

      <SaveDialogue
        open={Boolean(submitData)}
        onClose={onDialogueClose}
        userData={submitData}
      />
    </form>
  );
}
