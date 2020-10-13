import { useRef, useCallback, useEffect, useMemo } from 'react';
import useState from 'react-use-batched-state';
import usePersistentObject from '@/hooks/use-persistent-object';

export default function useValidatedInput(validator) {
  const [value, setValue] = useState('');
  const [errorHint, setErrorHint] = useState('');
  const valueRef = useRef('');
  const deferTimer = useRef(0);

  // Update ref on each value update to be able to access
  // value in callbacks without recreating callbacks.
  valueRef.current = value;

  const [dirty, setDirty] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);

  const onBlur = useCallback(() => {
    setTouched(true);
    setFocused(false);
  }, []);

  const onFocus = useCallback(() => setFocused(true), []);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    setDirty(true);
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
      onFocus,
      onChange,
    }),
    [onBlur, onFocus, onChange]
  );

  return usePersistentObject({
    inputProps,
    dirty: dirty,
    focused: focused,
    touched: touched,
    valid,
    validate,
    errorHint,
  });
}
