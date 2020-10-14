import { useCallback } from 'react';
import useState from 'react-use-batched-state';
import ProfileBar from './profile-bar';
import ProfileEditForm from './profile-edit-form';
import ProfileInfo from './profile-info';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = useCallback(() => setIsEditing(true), []);

  const onAfterSubmit = useCallback(() => setIsEditing(false), []);

  const children = isEditing ? (
    <ProfileEditForm onAfterSubmit={onAfterSubmit} />
  ) : (
    <ProfileInfo />
  );

  return (
    <div>
      <ProfileBar isEditing={isEditing} onEditClick={onEdit} />
      {children}
    </div>
  );
}
