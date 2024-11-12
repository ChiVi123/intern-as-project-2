import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, CollectionReference, doc, DocumentReference, setDoc } from 'firebase/firestore';

import { firebaseAuth, firebaseStore } from '~config';
import { getDocData, ResponseErrorRepo, ResponseRepo } from '~core';

import { IUserEntity, IUserFireBase } from './entity';

const baseUrl: string = 'https://firebasestorage.googleapis.com';
const imagePath: string = 'avatar-248x248-min.png?alt=media&token=10838519-a396-4d08-ad92-cfef968bfb23';
const photoURLDefault: string = `${baseUrl}/v0/b/intern-as-project-2.appspot.com/o/${imagePath}`;

export const userCollection = collection(firebaseStore, 'user') as CollectionReference<IUserFireBase>;

export const signIn = async (email: string, password: string) => {
    try {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
        console.log(error);
    }
};
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
    const docRef = doc(firebaseStore, 'user', id) as DocumentReference<IUserFireBase>;
    try {
        const res = await getDocData(docRef, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
