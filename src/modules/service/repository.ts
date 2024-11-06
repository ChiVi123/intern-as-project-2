import { collection, CollectionReference, doc, DocumentReference, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
export const getServiceById = async (id: string) => {
    const dataRef = doc(firebaseStore, 'service', id) as DocumentReference<IServiceEntity>;
    try {
        const res = await getDoc(dataRef);

        return res.exists()
            ? new ResponseRepo('Thành công', res)
            : new ResponseErrorRepo('Không tìm thấy dịch vụ', 'error');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const editServiceById = async (id: string, data: Omit<IServiceEntity, 'id'>) => {
    const dataRef = doc(firebaseStore, 'service', id) as DocumentReference<IServiceEntity>;
    try {
        await setDoc(dataRef, data, { merge: true });
        return new ResponseRepo('cập nhật thành công', '');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
