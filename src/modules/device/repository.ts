import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getDocs,
    setDoc,
} from 'firebase/firestore';
import { firebaseStore } from '~config';
import { ResponseErrorRepo, ResponseRepo } from '~core';
import { IDeviceEntity } from './entity';

export const deviceCollection = collection(firebaseStore, 'device') as CollectionReference<IDeviceEntity, DocumentData>;

export const addDevice = async (data: IDeviceEntity) => {
    const { id, ...dataDoc } = data;
    const dataRef = doc(firebaseStore, 'device', id);
    try {
        await setDoc(dataRef, dataDoc);
        return new ResponseRepo('Thêm thiết bị thành công');
    } catch (error) {
        return new ResponseErrorRepo('Thêm thiết bị thất bại', error);
    }
};
export const getAllDevice = async () => {
    try {
        const res = await getDocs(deviceCollection);
        return new ResponseRepo('Đã lấy danh sách thiết bị', res);
    } catch (error) {
        return new ResponseErrorRepo('Không thể lấy danh sách thiết bị', error);
    }
};
export const getDeviceById = async (id: string) => {
    const dataRef = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
    try {
        const res = await getDoc(dataRef);
        return res.exists()
            ? new ResponseRepo('Thành công', res)
            : new ResponseErrorRepo('Không tìm thấy thiết bị', 'error');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const editDevice = async (id: string, data: Omit<IDeviceEntity, 'id'>) => {
    const dataRef = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
    try {
        await setDoc(dataRef, data, { merge: true });
        return new ResponseRepo('cập nhật thành công', '');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
