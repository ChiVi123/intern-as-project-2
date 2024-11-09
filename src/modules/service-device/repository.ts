import { collection, CollectionReference, doc, DocumentReference, query, where, writeBatch } from 'firebase/firestore';
import { firebaseStore } from '~config';
import { getDocsRefs, ResponseErrorRepo, ResponseRepo } from '~core';
import { IDeviceEntity } from '~modules/device';
import { IServiceDeviceEntity } from './entity';

export const serviceDeviceCollection = collection(
    firebaseStore,
    'serviceDevice',
) as CollectionReference<IServiceDeviceEntity>;

export const getAllServiceByDeviceRef = async (ref: DocumentReference<IDeviceEntity>) => {
    const q = query(serviceDeviceCollection, where('device', '==', ref));
    try {
        const res = await getDocsRefs(q, { idField: 'id', fields: ['service'] });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getAllServiceDeviceByDeviceRef = async (ref: DocumentReference<IDeviceEntity>) => {
    const q = query(serviceDeviceCollection, where('device', '==', ref));
    try {
        const res = await getDocsRefs(q, { idField: 'id' });
        return new ResponseRepo('Thành công', res);
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const addAllServiceToDevice = async (deviceId: string, serviceIds: string[]) => {
    const batch = writeBatch(firebaseStore);
    const deviceRef = doc(firebaseStore, 'device', deviceId);

    serviceIds.forEach((serviceId) => {
        const serviceDeviceRef = doc(serviceDeviceCollection);
        const serviceRef = doc(firebaseStore, 'service', serviceId);
        batch.set(serviceDeviceRef, { device: deviceRef, service: serviceRef } as Omit<IServiceDeviceEntity, 'id'>);
    });

    try {
        await batch.commit();
        return new ResponseRepo('Thành công');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const deleteServiceDeviceByIds = async (ids: string[]) => {
    const batch = writeBatch(firebaseStore);
    ids.forEach((serviceId) => {
        const serviceRef = doc(firebaseStore, 'serviceDevice', serviceId);
        batch.delete(serviceRef);
    });

    try {
        await batch.commit();
        return new ResponseRepo('Xóa thành công');
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
