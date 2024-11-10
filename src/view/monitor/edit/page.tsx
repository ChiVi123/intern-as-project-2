import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Form, FormProps, Input, message, Select, SelectProps, Tag, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { doc, DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { firebaseStore } from '~config';
import { designToken, ResponseErrorRepo } from '~core';
import { cssButtonGroupForm, cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon, XMarkIcon } from '~icons';
import { editDevice, IDeviceEntity } from '~modules/device';
import { getAllService } from '~modules/service';
import {
    addAllServiceToDevice,
    deleteServiceDeviceByIds,
    getAllServiceDeviceByDeviceRef,
} from '~modules/service-device';

type DeviceField = {
    id: string;
    type: string;
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    serviceIds: string[];
};

type TagRender = SelectProps['tagRender'];

const cssItemCol = css({
    display: 'inline-block',
    width: 'calc(50% - 24px)',
});
const StyledCloseIcon = styled(XMarkIcon)({
    '& > svg': { fontSize: '1.125rem', color: 'white' },
});
const StyledTag = styled(Tag)({
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 4,
    marginBlock: 8,
    lineHeight: 1.5,
});

const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <StyledTag
            closable={closable}
            closeIcon={<StyledCloseIcon />}
            style={{ marginRight: 4 }}
            onMouseDown={onPreventMouseDown}
            onClose={onClose}
        >
            {label}
        </StyledTag>
    );
};

function EditMonitorPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    const [form] = Form.useForm();
    const loader = useLoaderData() as DeviceField;
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const response = await getAllService();
            if (response instanceof ResponseErrorRepo) {
                return;
            }
            if (!response.data) {
                return;
            }
            setOptions(response.data!.map((item) => ({ label: item.name, value: item.id })));
        })();
    }, []);

    const handleSubmit: FormProps<DeviceField>['onFinish'] = async ({ id, serviceIds, ...data }) => {
        const deviceRef = doc(firebaseStore, 'device', id) as DocumentReference<IDeviceEntity>;
        const allServiceDeviceResult = await getAllServiceDeviceByDeviceRef(deviceRef);
        if (allServiceDeviceResult instanceof ResponseErrorRepo) {
            messageApi.open({ type: 'error', content: allServiceDeviceResult.message });
            return;
        }

        const removeServiceResult = await deleteServiceDeviceByIds(allServiceDeviceResult.data!.map((item) => item.id));
        if (removeServiceResult instanceof ResponseErrorRepo) {
            messageApi.open({ type: 'error', content: removeServiceResult.message });
            return;
        }

        const deviceResult = await editDevice(id, {
            ...data,
            actionStatus: { label: 'Hoạt động', value: 'running' },
            connectStatus: { label: 'Kết nối', value: 'connecting' },
        });
        const serviceDeviceResult = await addAllServiceToDevice(id, serviceIds);
        console.log(serviceDeviceResult);

        if (serviceDeviceResult instanceof ResponseErrorRepo) {
            console.log(serviceDeviceResult.error);
        }

        messageApi.open({ type: deviceResult.success ? 'success' : 'error', content: deviceResult.message });
    };

    return (
        <>
            {contextHolder}
            <Typography.Title level={3}>Quản lý thiết bị</Typography.Title>
            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin thiết bị
                </Typography.Title>

                <Form form={form} initialValues={loader} onFinish={handleSubmit}>
                    {/* row1 */}
                    <Form.Item>
                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Mã thiết bị:'
                            name='id'
                            required
                            css={cssItemCol}
                        >
                            <Input placeholder='Nhập mã thiết bị' />
                        </Form.Item>

                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Loại thiết bị:'
                            name='type'
                            required
                            css={[cssItemCol, { marginLeft: 24 }]}
                        >
                            <StyledSelect placeholder='Chọn loại thiết bị' suffixIcon={<ChevronDownSolidIcon />}>
                                <Select.Option value='kiosk'>Kiosk</Select.Option>
                                <Select.Option value='displayCounter'>Display counter</Select.Option>
                            </StyledSelect>
                        </Form.Item>
                    </Form.Item>

                    {/* row2 */}
                    <Form.Item>
                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Tên thiết bị:'
                            name='name'
                            required
                            css={cssItemCol}
                        >
                            <Input placeholder='Nhập tên thiết bị' />
                        </Form.Item>

                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Tên đăng nhập:'
                            name='usernameDevice'
                            required
                            css={[cssItemCol, { marginLeft: 24 }]}
                        >
                            <Input placeholder='Nhập tài khoản' />
                        </Form.Item>
                    </Form.Item>

                    {/* row3 */}
                    <Form.Item>
                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Địa chỉ IP:'
                            name='ipAddress'
                            required
                            css={cssItemCol}
                        >
                            <Input placeholder='Nhập địa chỉ IP' />
                        </Form.Item>

                        <Form.Item<DeviceField>
                            layout='vertical'
                            label='Mật khẩu:'
                            name='passwordDevice'
                            required
                            css={[cssItemCol, { marginLeft: 24 }]}
                        >
                            <Input name='passwordDevice' placeholder='Nhập mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    {/* row4 */}
                    <Form.Item<DeviceField>
                        layout='vertical'
                        label='Dịch vụ sử dụng:'
                        name='serviceIds'
                        required
                        rules={[{ required: true, message: 'Vui lòng thêm dịch vụ' }]}
                    >
                        <Select
                            mode='multiple'
                            style={{ width: 'calc(100% - 24px)' }}
                            placeholder='Nhập dịch vụ sử dụng'
                            options={options}
                            suffixIcon={null}
                            tagRender={tagRender}
                        />
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 82 }}>
                        <span css={{ fontFamily: 'SimSun, sans-serif', color: designToken['colorError'] }}>*</span>
                        <Typography.Text>Là trường thông tin bắt buộc</Typography.Text>
                    </div>
                </Form>
            </div>

            <div css={cssButtonGroupForm}>
                <Button htmlType='button' variant='filled' onClick={() => navigate(-1)}>
                    Hủy bỏ
                </Button>
                <Button htmlType='button' onClick={() => form.submit()}>
                    Cập nhật
                </Button>
            </div>
        </>
    );
}

export default EditMonitorPage;
