import { User } from 'firebase/auth';
import { IUserEntity, IUserFireBase } from '~modules/user';

const photoURLDefault: string =
    'https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/avatar-248x248-min.png?alt=media&token=10838519-a396-4d08-ad92-cfef968bfb23';

export const mapToUserEntity = (userAuth: User, userFirebase: IUserFireBase): IUserEntity => ({
    username: userFirebase.username ?? userAuth.email!.split('@')[0].toLowerCase(),
    displayName: userAuth.displayName ?? '',
    email: userAuth.email!,
    photoURL: userAuth.photoURL ?? photoURLDefault,
    phoneNumber: userFirebase.phoneNumber ?? '',
    role: userFirebase.role,
    status: userFirebase.status,
});
