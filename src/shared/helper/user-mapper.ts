import { User } from 'firebase/auth';
import { IUserEntity } from '~modules/user';

const photoURLDefault: string =
    'https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/avatar-248x248-min.png?alt=media&token=10838519-a396-4d08-ad92-cfef968bfb23';

export const mapUserToUserEntity = (user: User): IUserEntity => ({
    username: user.displayName ?? user.email!.split('@')[0].toLowerCase(),
    email: user.email!,
    photoURL: user.photoURL ?? photoURLDefault,
    phoneNumber: user.phoneNumber ?? '',
});
