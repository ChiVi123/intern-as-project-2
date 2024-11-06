import { collection, CollectionReference, doc, getDocs, setDoc } from 'firebase/firestore';
import { firebaseStore } from '~config';
import { ResponseErrorRepo, ResponseRepo } from '~core';
import { IServiceEntity } from './entity';

export const serviceCollection = collection(firebaseStore, 'service') as CollectionReference<IServiceEntity>;

export const addService = async (data: IServiceEntity) => {
    const { id, ...dataDoc } = data;
    const dataRef = doc(firebaseStore, 'service', id);
    try {
        await setDoc(dataRef, dataDoc);
        return new ResponseRepo('Thêm dịch vụ thành công');
    } catch (error) {
        return new ResponseErrorRepo('Thêm dịch vụ thất bại', error);
    }
};
export const getAllService = async () => {
    try {
        const res = await getDocs(serviceCollection);
        return new ResponseRepo('Đã lấy danh sách dịch vụ', res);
    } catch (error) {
        return new ResponseErrorRepo('Không thể lấy danh sách dịch vụ', error);
    }
};
