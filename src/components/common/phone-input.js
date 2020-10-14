import InputMask from 'react-input-mask';

export default function PhoneInput(props) {
  return <InputMask mask="+7 999 999 99 99" maskChar={null} {...props} />;
}
