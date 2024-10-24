import { Avatar, Breadcrumb, Typography } from 'antd';
import { firebaseAuth } from '~config';
const photoURLDefault: string =
    'https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/avatar-placeholder-min.png?alt=media&token=8c99983b-8137-4e42-b20e-980156eb2018';

function ProfilePage() {
    const user = firebaseAuth.currentUser;

    return (
        <>
            <Breadcrumb items={[{ title: 'Thông tin cá nhân' }]} />
            <Typography.Title>{user?.displayName}</Typography.Title>
            <Typography.Paragraph>{user?.email}</Typography.Paragraph>
            <Avatar src={user?.photoURL || photoURLDefault} alt='user' size={248} />
        </>
    );
}

export default ProfilePage;
