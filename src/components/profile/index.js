import { useCallback, useRef } from 'react';
import useState from 'react-use-batched-state';
import PageHeader from '@/components/common/page-header';
import PageBreadcrumbs from '@/components/common/page-breadcrumbs';
import ProfileBar from './profile-bar';
import ProfileEditForm from './profile-edit-form';
import ProfileInfo from './profile-info';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const isEditingRef = useRef(isEditing);
  isEditingRef.current = isEditing;

  const onEdit = useCallback(() => setIsEditing(!isEditingRef.current), []);

  const onAfterSubmit = useCallback(() => setIsEditing(false), []);

  const children = isEditing ? (
    <ProfileEditForm onAfterSubmit={onAfterSubmit} />
  ) : (
    <ProfileInfo />
  );

  return (
    <div>
      <PageHeader>Личный профиль</PageHeader>

      <PageBreadcrumbs>{['Главная', 'Личный профиль']}</PageBreadcrumbs>

      <ProfileBar isEditing={isEditing} onEditClick={onEdit} />
      {children}
    </div>
  );
}
