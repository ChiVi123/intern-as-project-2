import { DocumentReference } from 'firebase/firestore';
import { IRoleEntity } from '~modules/role';

export interface IUserEntity {
    username: string;
    displayName: string;
    email: string;
    photoURL: string;
    phoneNumber: string;
    role: DocumentReference<IRoleEntity> | IRoleEntity | null;
    status: string;
}
export interface IUserFireBase {
    username: string;
    email: string;
    phoneNumber: string;
    role: DocumentReference<IRoleEntity> | IRoleEntity | null;
    status: string;
}
