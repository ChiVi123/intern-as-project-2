import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    DocumentReference,
    getCountFromServer,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore';

import { firebaseStore } from '~config';
import { getDocData, getDocsData, ResponseErrorRepo, ResponseRepo } from '~core';
import { DeviceForm, IDeviceEntity } from './entity';

export const deviceCollection = collection(firebaseStore, 'device') as CollectionReference<IDeviceEntity, DocumentData>;

export const addDevice = async (data: DeviceForm) => {
    const { id, ...dataDoc } = data;
    const dataRef = doc(firebaseStore, 'device', id);
    try {
        await setDoc(dataRef, { ...dataDoc, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        return new ResponseRepo('Thêm thiết bị thành công');
    } catch (error) {
        return new ResponseErrorRepo('Thêm thiết bị thất bại', error);
    }
};
export const getAllDevice = async () => {
    try {
        const res = await getDocsData(deviceCollection, { idField: 'id' });
        return new ResponseRepo('Đã lấy danh sách thiết bị', res);
    } catch (error) {
        return new ResponseErrorRepo('Không thể lấy danh sách thiết bị', error);
    }
};
export const getDeviceById = async (id: string) => {
    const dataRef = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
    try {
        const res = await getDocData(dataRef, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const editDevice = async (id: string, data: Omit<DeviceForm, 'id'>) => {
    const dataRef = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
    try {
        await setDoc(dataRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
        return new ResponseRepo('cập nhật thành công', '');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const countDeviceByActionStatus = async (actionStatus: string) => {
    try {
        const q = query(deviceCollection, where('actionStatus.value', '==', actionStatus));
        const snapshot = await getCountFromServer(q);
        return new ResponseRepo('Thành công', snapshot.data().count);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
