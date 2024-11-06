import { collection, CollectionReference, doc, DocumentData, getDocs, setDoc } from 'firebase/firestore';
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
