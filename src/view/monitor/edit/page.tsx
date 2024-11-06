import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Form, FormProps, Input, message, Select, SelectProps, Tag, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { doc, DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { firebaseStore } from '~config';
import { designToken, ResponseErrorRepo } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon, XMarkIcon } from '~icons';
import { editDevice } from '~modules/device';
import { getAllService, IServiceEntity } from '~modules/service';

type DeviceField = {
    id: string;
    type: { label: string; value: string };
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    services: string[];
    serviceRefs: DocumentReference<IServiceEntity>[];
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

    useEffect(() => {
        (async function () {
            const response = await getAllService();
            if (response instanceof ResponseErrorRepo) {
                return;
            }
            if (!response.data) {
                return;
            }
            setOptions(response.data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
        })();
    }, []);

    const handleSubmit: FormProps<DeviceField>['onFinish'] = async ({ id, services, ...data }) => {
        data.serviceRefs = new Array<DocumentReference<IServiceEntity>>(services.length);
        services.forEach((serviceId, index) => {
            data.serviceRefs[index] = doc(firebaseStore, 'service', serviceId) as DocumentReference<IServiceEntity>;
        });

        const result = await editDevice(id, {
            ...data,
            actionStatus: { label: 'Hoạt động', value: 'running' },
            connectStatus: { label: 'Kết nối', value: 'connecting' },
        });
        messageApi.open({ type: result.success ? 'success' : 'error', content: result.message });
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
                    <Form.Item<DeviceField> layout='vertical' label='Dịch vụ sử dụng:' name='services' required>
                        <Select
                            mode='multiple'
                            style={{ width: 'calc(100% - 24px)' }}
                            placeholder='Nhập dịch vụ sử dụng'
                            options={options}
                            suffixIcon={null}
                            tagRender={tagRender}
                        />
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 54 }}>
                        <span css={{ fontFamily: 'SimSun, sans-serif', color: designToken['colorError'] }}>*</span>
                        <Typography.Text>Là trường thông tin bắt buộc</Typography.Text>
                    </div>
                </Form>
            </div>

            <div css={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, marginBottom: 32 }}>
                <Button htmlType='button' variant='filled'>
                    Hủy bỏ
                </Button>
                <Button htmlType='button' onClick={() => form.submit()}>
                    Thêm thiết bị
                </Button>
            </div>
        </>
    );
}

export default EditMonitorPage;
