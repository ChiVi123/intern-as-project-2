import { DocumentReference, Timestamp } from 'firebase/firestore';
import { IServiceEntity } from '~modules/service';

export interface IQueueingEntity {
    id: string;
    guestName: string;
    email: string;
    phoneNumber: string;
    device: string;
    status: string;
    ordinalNumber: number;
    createdAt: Timestamp;
    expired: Timestamp;
    service: DocumentReference<IServiceEntity> | IServiceEntity;
}
