import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';
import { denormalizeUserData } from '@/lib/utils';

export default function AppBar() {
  const { user } = useContext(LocalDataContext);
  const { name } = denormalizeUserData(user);

  return <div>{name}</div>;
}
