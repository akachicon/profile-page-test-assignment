import { useContext, useCallback, useMemo } from 'react';
import useState from 'react-use-batched-state';
import {
  makeStyles,
  Paper,
  Grid,
  TextField,
  Divider,
  Box,
} from '@material-ui/core';
import {
  AssignmentInd as UserIcon,
  AlternateEmail as EmailIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import useSmallScreenMatch from '@/hooks/use-small-screen-match';
import useValidatedInput from '@/hooks/use-validated-input';
import { name, email, phone } from '@/lib/validators';
import { LocalDataContext } from '@/lib/local-data-context';
import PhoneInput from '@/components/common/phone-input';
import Button from '@/components/common/button';
import SaveDialog, { stateMap as dialogStateMap } from './save-dialog';

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(5.5),
  },
  inputList: {
    minHeight: 97,
    marginBottom: theme.spacing(4),
  },
  inputCaption: {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: `${theme.typography.body2.fontSize}px`,
  },
  input: {
    width: '90%',
    maxWidth: 256,
    fontSize: theme.typography.body2.fontSize,
  },
  notchedOutline: {
    fontSize: theme.typography.body2.fontSize,
    borderRadius: 5,
  },
  errorText: {
    position: 'absolute',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    transform: 'translate(0, 55px)',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: '35%',
    transform: 'translate(-8px, 6px)',
    color: theme.palette.secondary.main,
  },
  inputWrapperSmallScreen: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(5),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  [theme.breakpoints.down('sm')]: {
    form: {
      paddingBottom: theme.spacing(2),
    },
    inputList: {
      minHeight: 250,
      marginBottom: theme.spacing(3),
    },
    input: {
      width: '100%',
    },
    errorText: {
      position: 'initial',
      transform: 'none',
    },
  },
}));

function getInputError(valid, touched, submitAttempted) {
  return !valid && (touched || submitAttempted);
}

function normalizeInput(input) {
  return input.trim().replace(/\s+/g, ' ');
}

export default function ProfileEditForm({ onAfterSubmit }) {
  const cls = useStyles();
  const smallScreen = useSmallScreenMatch(false);

  const { rawUser: user } = useContext(LocalDataContext);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  const defaultName = user?.name ?? '';
  const defaultEmail = user?.email ?? '';
  const defaultPhoneNumber = user?.phoneNumber ?? '';

  const nameInput = useValidatedInput(name, defaultName);
  const emailInput = useValidatedInput(email, defaultEmail);
  const phoneInput = useValidatedInput(phone, defaultPhoneNumber);

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
          name: normalizeInput(nameInput.value),
          email: normalizeInput(emailInput.value),
          phoneNumber: phoneInput.value,
        });
      }
    },
    [nameInput, emailInput, phoneInput, validateInputs]
  );

  const onDialogClose = useCallback(
    (dialogState) => {
      const { SAVING, SAVED } = dialogStateMap;

      // Prevent user from closing dialog while saving.
      if (dialogState === SAVING) return;

      if (dialogState === SAVED) {
        onAfterSubmit();
      }

      setSubmitData(null);
    },
    [onAfterSubmit]
  );

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

  const gridInputItem = useCallback(
    (inputElement, IconComponent) =>
      smallScreen ? (
        <Grid className={cls.inputWrapperSmallScreen} item xs={12}>
          {inputElement}
        </Grid>
      ) : (
        <Grid item container wrap="nowrap" justify="space-around">
          <Grid className={cls.iconWrapper} item sm={3}>
            <IconComponent className={cls.icon} />
          </Grid>
          <Grid item sm={9}>
            <Box mt={3.3}>{inputElement}</Box>
          </Grid>
        </Grid>
      ),
    [cls.iconWrapper, cls.icon, cls.inputWrapperSmallScreen, smallScreen]
  );

  const divider = useMemo(
    () => (
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
    ),
    []
  );

  const genericInputProps = useMemo(
    () => ({ classes: { notchedOutline: cls.notchedOutline } }),
    [cls.notchedOutline]
  );
  const phoneInputProps = useMemo(
    () => ({ inputComponent: PhoneInput, ...genericInputProps }),
    [genericInputProps]
  );
  const InputLabelProps = useMemo(() => ({ className: cls.inputCaption }), [
    cls.inputCaption,
  ]);
  const FormHelperTextProps = useMemo(() => ({ className: cls.errorText }), [
    cls.errorText,
  ]);

  nameInput.inputProps.className = cls.input;
  emailInput.inputProps.className = cls.input;
  phoneInput.inputProps.className = cls.input;

  return (
    <Paper elevation={25}>
      <form
        className={cls.form}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Grid
          className={cls.inputList}
          container
          direction={smallScreen ? 'column' : 'row'}
          wrap="nowrap"
          justify="space-between"
        >
          {gridInputItem(
            <TextField
              className={cls.input}
              label="Фамилия и имя"
              placeholder="Иванов Иван"
              variant="outlined"
              inputProps={nameInput.inputProps}
              InputProps={genericInputProps}
              InputLabelProps={InputLabelProps}
              FormHelperTextProps={FormHelperTextProps}
              error={nameError}
              helperText={nameError && nameInput.errorHint}
              defaultValue={nameInput.value}
            />,
            UserIcon
          )}

          {!smallScreen && divider}

          {gridInputItem(
            <TextField
              className={cls.input}
              label="E-mail"
              placeholder="ivanov@mail.ru"
              variant="outlined"
              inputProps={emailInput.inputProps}
              InputProps={genericInputProps}
              InputLabelProps={InputLabelProps}
              FormHelperTextProps={FormHelperTextProps}
              error={emailError}
              helperText={emailError && emailInput.errorHint}
              defaultValue={emailInput.value}
            />,
            EmailIcon
          )}

          {!smallScreen && divider}

          {gridInputItem(
            <TextField
              className={cls.input}
              type="tel"
              label="Номер телефона"
              placeholder="+7 999 999 99 99"
              variant="outlined"
              inputProps={phoneInput.inputProps}
              InputLabelProps={InputLabelProps}
              FormHelperTextProps={FormHelperTextProps}
              error={phoneError}
              helperText={phoneError && phoneInput.errorHint}
              InputProps={phoneInputProps}
              defaultValue={phoneInput.value}
            />,
            PhoneIcon
          )}
        </Grid>

        <Box display="flex" justifyContent="center" width="1">
          <Button type="submit" variant="contained">
            Сохранить изменения
          </Button>
        </Box>
      </form>

      <SaveDialog
        open={Boolean(submitData)}
        onClose={onDialogClose}
        userData={submitData}
      />
    </Paper>
  );
}
