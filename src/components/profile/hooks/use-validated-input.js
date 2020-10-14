import { useRef, useCallback, useEffect, useMemo } from 'react';
import useState from 'react-use-batched-state';
import usePersistentObject from '@/hooks/use-persistent-object';

export default function useValidatedInput(validator, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [errorHint, setErrorHint] = useState('');
  const valueRef = useRef('');
  const deferTimer = useRef(0);

  // Update ref on each value update to be able to access
  // value in callbacks without recreating callbacks.
  valueRef.current = value;

  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const validate = useCallback(() => {
    const validationResult = validator(valueRef.current);

    setValid(validationResult.isValid);
    setErrorHint(validationResult.errorMessage);

    return validationResult;
  }, [validator]);

  useEffect(() => {
    deferTimer.current = setTimeout(validate, 100);

    return () => clearTimeout(deferTimer.current);
  }, [value, validate]);

  const inputProps = useMemo(
    () => ({
      onBlur,
      onChange,
    }),
    [onBlur, onChange]
  );

  return usePersistentObject({
    inputProps,
    touched,
    valid,
    validate,
    errorHint,
    value,
  });
}
