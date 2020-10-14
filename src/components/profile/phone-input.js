import { IMaskInput } from '@mirco312312/react-imask';

// TODO: switch to official react-imask when available.
// https://github.com/uNmAnNeR/imaskjs/issues/383

export default function PhoneInput(props) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      onAccept={onChange}
      mask="{+7 }000{ }000{ }00{ }00"
    />
  );
}
