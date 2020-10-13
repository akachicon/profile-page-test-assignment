import NumberFormat from 'react-number-format';

export default function PhoneInput(props) {
  const { inputRef, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isNumericString
      decimalScale={0}
      format="+7 ### ### ## ##"
      allowEmptyFormatting
    />
  );
}
