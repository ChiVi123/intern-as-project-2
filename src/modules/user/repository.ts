import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, CollectionReference, doc, setDoc } from 'firebase/firestore';

import { firebaseAuth, firebaseStore } from '~config';
import { getDocRefs, getDocsRefs, ResponseErrorRepo, ResponseRepo } from '~core';

import { IUserEntity, IUserFireBase } from './entity';

const baseUrl: string = 'https://firebasestorage.googleapis.com';
const imagePath: string = 'avatar-248x248-min.png?alt=media&token=10838519-a396-4d08-ad92-cfef968bfb23';
const photoURLDefault: string = `${baseUrl}/v0/b/intern-as-project-2.appspot.com/o/${imagePath}`;

export const userCollection = collection(firebaseStore, 'user') as CollectionReference<IUserFireBase>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addUser = async ({ displayName, photoURL, ...data }: Omit<IUserEntity, 'id'>, password: string) => {
    const userAuthRes = await createUserWithEmailAndPassword(firebaseAuth, data.email, password).catch(
        (error) => error as Error,
    );
    if (userAuthRes instanceof Error) {
        return new ResponseErrorRepo('Xảy ra lỗi', userAuthRes);
    }

    try {
        await updateProfile(userAuthRes.user, {
            displayName,
            photoURL: photoURLDefault,
        });
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }

    const userRef = doc(firebaseStore, 'user', userAuthRes.user.uid);

    try {
        await setDoc(userRef, data);
        return new ResponseRepo('Thành công');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getUserById = async (id: string) => {
    const docRef = doc(userCollection, id);
    try {
        const res = await getDocRefs(docRef, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        console.log(error);
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getAllUser = async () => {
    try {
        const res = await getDocsRefs(userCollection, { idField: 'id' });
        return res.length ? new ResponseRepo('Thành công', res) : new ResponseErrorRepo('Không tìm thấy', 'error');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const editUser = async (data: IUserFireBase) => {
    const docRef = doc(userCollection, data.id);
    try {
        await setDoc(docRef, data);
        return new ResponseRepo('Thành công');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
