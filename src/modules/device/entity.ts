import { Timestamp } from 'firebase/firestore';
import { IServiceEntity } from '~modules/service';

export interface IDeviceEntity {
    id: string;
    type: string;
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    services?: IServiceEntity[];
    actionStatus: { label: string; value: string };
    connectStatus: { label: string; value: string };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export type DeviceForm = Omit<IDeviceEntity, 'createdAt' | 'updatedAt'>;
