import {
    addDoc,
    collection,
    CollectionReference,
    DocumentReference,
    getCountFromServer,
    query,
    where,
} from 'firebase/firestore';
import { firebaseStore } from '~config';
import { getDocsRefs, ResponseErrorRepo, ResponseRepo } from '~core';
import { IQueueingEntity } from './entity';

export const queueingCollection = collection(firebaseStore, 'queueing') as CollectionReference<IQueueingEntity>;

export const addQueueing = async (data: Omit<IQueueingEntity, 'id'>) => {
    try {
        const docRef = await addDoc(queueingCollection, data);
        return new ResponseRepo('Đã cấp số thành công', docRef);
    } catch (error) {
        return new ResponseErrorRepo('Cấp số thất bại', error);
    }
};
export const getCountByServiceRef = async (serviceRef: DocumentReference) => {
    try {
        const q = query(queueingCollection, where('service', '==', serviceRef));
        const snapshot = await getCountFromServer(q);
        return new ResponseRepo('Thành công', snapshot.data().count);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getAllQueueing = async () => {
    try {
        const res = await getDocsRefs(queueingCollection, { idField: 'id' });
        return new ResponseRepo('Đã lấy danh sách cấp số', res);
    } catch (error) {
        return new ResponseErrorRepo('Không thể lấy danh sách cấp số', error);
    }
};
