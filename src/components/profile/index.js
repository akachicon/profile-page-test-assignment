import { useState, useCallback } from 'react';
import ProfileBar from './profile-bar';
import ProfileEditForm from './profile-edit-form';
import ProfileInfo from './profile-info';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = useCallback(() => setIsEditing(true), []);

  const children = isEditing ? <ProfileEditForm /> : <ProfileInfo />;

  return (
    <div>
      <ProfileBar isEditing={isEditing} onEditClick={onEdit} />
      {children}
    </div>
  );
}
