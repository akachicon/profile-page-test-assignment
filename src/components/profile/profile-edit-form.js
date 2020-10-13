import { useCallback, useMemo } from 'react';
import useState from 'react-use-batched-state';
import { TextField, Button } from '@material-ui/core';
import { name, email, phone } from '@/lib/validators';
import useValidatedInput from './hooks/use-validated-input';
import PhoneInput from './phone-input';

function getInputError({ focused, dirty, valid, touched }, submitAttempted) {
  return (
    !valid && ((focused && dirty && touched) || touched || submitAttempted)
  );
}

export default function ProfileEditForm() {
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nameInput = useValidatedInput(name);
  const emailInput = useValidatedInput(email);
  const phoneInput = useValidatedInput(phone);

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
        console.log('submit');
      }
    },
    [validateInputs]
  );

  const InputProps = useMemo(() => ({ inputComponent: PhoneInput }), []);

  const nameError = getInputError(nameInput, submitAttempted);
  const emailError = getInputError(emailInput, submitAttempted);
  const phoneError = getInputError(phoneInput, submitAttempted);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        label="Фамилия и имя"
        placeholder="Иванов Иван"
        variant="outlined"
        inputProps={nameInput.inputProps}
        error={nameError}
        helperText={nameError && nameInput.errorHint}
      />

      <TextField
        label="E-mail"
        placeholder="ivanov@mail.ru"
        variant="outlined"
        inputProps={emailInput.inputProps}
        error={emailError}
        helperText={emailError && emailInput.errorHint}
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
      />

      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </form>
  );
}
