import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';

export default function AppBar() {
  const {
    user: { firstName, lastName },
  } = useContext(LocalDataContext);

  return (
    <div>
      {firstName} {lastName}
    </div>
  );
}
