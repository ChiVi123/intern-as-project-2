import { getISOWeek } from 'date-fns';
import {
    addDoc,
    collection,
    CollectionReference,
    DocumentReference,
    getCountFromServer,
    limit,
    orderBy,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import { firebaseStore } from '~config';
import { getDocsData, getDocsRefs, ResponseErrorRepo, ResponseRepo } from '~core';
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
export const getAllQueueingNotRef = async () => {
    const q = query(queueingCollection, orderBy('createdAt', 'asc'));
    try {
        const res = await getDocsData(q, { idField: 'id' });
        return new ResponseRepo('Đã lấy danh sách cấp số', res);
    } catch (error) {
        return new ResponseErrorRepo('Không thể lấy danh sách cấp số', error);
    }
};
export const countQueueingByStatus = async (status: string) => {
    const now = new Date();
    const oneAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const qAgo = query(queueingCollection, where('createdAt', '<=', Timestamp.fromDate(oneAgo)));

    const q = query(queueingCollection, where('status.value', '==', status));
    try {
        const snapshot = await getCountFromServer(q);
        const snapshotAgo = await getCountFromServer(qAgo);
        return new ResponseRepo('Thành công', { count: snapshot.data().count, ago: snapshotAgo.data().count });
    } catch (error) {
        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};
export const getOldestDocument = async () => {
    const q = query(queueingCollection, orderBy('createdAt', 'asc'), limit(1));
    try {
        const res = await getDocsData(q);
        return res.length
            ? new ResponseRepo('Thành công', res[0].createdAt)
            : new ResponseErrorRepo('Xảy ra lỗi', 'error');
    } catch (error) {
        console.log(error);

        return new ResponseErrorRepo('Xảy ra lỗi', error);
    }
};

type GroupedCounts = {
    [key: string]: number; // Keys are formatted as YYYY-MM-DD, YYYY-MM, or YYYY
};
export const countGroupedBy = async (
    startDate: Date,
    endDate: Date,
    groupBy: 'day' | 'week' | 'month',
): Promise<GroupedCounts> => {
    // Query documents within the date range
    const q = query(
        queueingCollection,
        where('createdAt', '>=', Timestamp.fromDate(startDate)),
        where('createdAt', '<=', Timestamp.fromDate(endDate)),
    );

    const querySnapshot = await getDocsData(q);

    const groupedCounts: GroupedCounts = {};

    querySnapshot.forEach((doc) => {
        if (doc.createdAt) {
            const date = doc.createdAt.toDate(); // Convert Firestore timestamp to JS Date

            // Determine the key based on the grouping
            let key: string;
            switch (groupBy) {
                case 'day':
                    key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                        date.getDate(),
                    ).padStart(2, '0')}`;
                    break;
                case 'week':
                    key = `${date.getFullYear()}-W${String(getISOWeek(date)).padStart(2, '0')}`;
                    break;
                case 'month':
                    key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    break;
                default:
                    throw new Error(`Invalid groupBy value: ${groupBy}`);
            }

            // Increment count for the key
            groupedCounts[key] = (groupedCounts[key] || 0) + 1;
        }
    });

    return groupedCounts;
};
