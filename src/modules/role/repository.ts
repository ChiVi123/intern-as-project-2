import { addDoc, collection, CollectionReference, doc, DocumentReference, setDoc } from 'firebase/firestore';
import { firebaseStore } from '~config';
import { getDocData, getDocsData, ResponseErrorRepo, ResponseRepo } from '~core';
import { IRoleEntity } from './entity';

export const roleCollection = collection(firebaseStore, 'role') as CollectionReference<IRoleEntity>;

export const addRole = async (data: Omit<IRoleEntity, 'id'>) => {
    try {
        const docRef = await addDoc(roleCollection, data);
        return new ResponseRepo('Thành công', docRef);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getAllRole = async () => {
    try {
        const res = await getDocsData(roleCollection, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getRoleById = async (id: string) => {
    const dataRef = doc(firebaseStore, 'role', id) as DocumentReference<IRoleEntity>;
    try {
        const res = await getDocData(dataRef, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const editRoleById = async (id: string, data: Omit<IRoleEntity, 'id'>) => {
    const dataRef = doc(firebaseStore, 'role', id) as DocumentReference<IRoleEntity>;
    try {
        await setDoc(dataRef, data, { merge: true });
        return new ResponseRepo('cập nhật thành công');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
