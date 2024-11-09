import { DocumentReference } from 'firebase/firestore';
import { IServiceEntity } from '~modules/service/entity';

export interface IServiceDeviceEntity {
    id: string;
    service: DocumentReference<IServiceEntity> | IServiceEntity;
    device: DocumentReference<IServiceEntity> | IServiceEntity;
}
