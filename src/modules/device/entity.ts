import { DocumentReference } from 'firebase/firestore';
import { IServiceEntity } from '~modules/service';

export interface IDeviceEntity {
    id: string;
    type: { label: string; value: string };
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    services?: IServiceEntity[];
    serviceRefs: DocumentReference<IServiceEntity>[];
    actionStatus: { label: string; value: string };
    connectStatus: { label: string; value: string };
}
