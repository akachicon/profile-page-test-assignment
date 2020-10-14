import { useContext } from 'react';
import { LocalDataContext } from '@/lib/local-data-context';
import { denormalizeUserData } from '@/lib/utils';

export default function ProfileBar({ isEditing, onEditClick }) {
  const { user } = useContext(LocalDataContext);
  const { name } = denormalizeUserData(user);

  return (
    <div>
      {name}
      <div>редактирование: {isEditing ? 'y' : 'n'}</div>
      <button onClick={onEditClick}>редактировать</button>
    </div>
  );
}
