import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';

export default function AppBar() {
  const { user } = useContext(LocalDataContext);
  const { name } = user;

  return <div>{name}</div>;
}
