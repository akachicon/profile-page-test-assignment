import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';

export default function ProfileBar({ isEditing, onEditClick }) {
  const { user } = useContext(LocalDataContext);
  const { name } = user;

  return (
    <div>
      {name}
      <div>редактирование: {isEditing ? 'y' : 'n'}</div>
      <button onClick={onEditClick}>редактировать</button>
    </div>
  );
}
