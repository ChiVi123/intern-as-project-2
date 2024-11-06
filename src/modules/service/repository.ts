import { collection, CollectionReference, doc, setDoc } from 'firebase/firestore';
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
