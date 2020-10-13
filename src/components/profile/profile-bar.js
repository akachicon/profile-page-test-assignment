import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';

export default function ProfileBar({ isEditing, onEditClick }) {
  const {
    user: { name },
  } = useContext(LocalDataContext);

  return (
    <div>
      {name}
      <div>редактирование: {isEditing ? 'y' : 'n'}</div>
      <button onClick={onEditClick}>редактировать</button>
    </div>
  );
}
