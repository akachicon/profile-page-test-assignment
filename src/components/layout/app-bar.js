import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';

export default function AppBar() {
  const {
    user: { name },
  } = useContext(LocalDataContext);

  return <div>{name}</div>;
}
