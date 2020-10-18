import { makeStyles } from '@material-ui/core';
import { BG_WAVE_GRADIENT_ID } from '@/constants';

const useStyles = makeStyles((theme) => ({
  bgImage: {
    position: 'absolute',
    zIndex: -99999,
    width: '100vw',
    [theme.breakpoints.up('xs')]: {
      height: '61vw',
    },
    [theme.breakpoints.up('sm')]: {
      height: '36vw',
    },
    [theme.breakpoints.up('lg')]: {
      height: '24vw',
    },
  },
}));

export default function Wave() {
  const cls = useStyles();

  return (
    <svg
      className={cls.bgImage}
      viewBox="75 0 1400 470"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H1481V470C1114.99 -38.4972 367.553 634.454 0 401.971V0Z"
        fill={`url(#${BG_WAVE_GRADIENT_ID})`}
      />
      <defs>
        <linearGradient
          id={BG_WAVE_GRADIENT_ID}
          x1="1481"
          y1="235.001"
          x2="-15.6763"
          y2="235.001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2196F3" />
          <stop offset="1" stopColor="#1EC3AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
