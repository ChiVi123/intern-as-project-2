import { css } from '@emotion/react';
import { Form, FormProps, Input, message, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { designToken, ResponseErrorRepo } from '~core';
import { cssButtonGroupForm } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';
import { addDevice } from '~modules/device';
import { getAllService } from '~modules/service';
import { addAllServiceToDevice } from '~modules/service-device';
import { TagRenderCustom } from '../components';

type DeviceField = {
    id: string;
    type: string;
    name: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    serviceIds: string[];
};

const cssItemCol = css({
    display: 'inline-block',
    width: 'calc(50% - 24px)',
});

function AddMonitorPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const response = await getAllService();
            if (response instanceof ResponseErrorRepo) {
                return;
            }
            setOptions(response.data!.map((item) => ({ label: item.name, value: item.id })));
        })();
    }, []);

    const handleSubmit: FormProps<DeviceField>['onFinish'] = async ({ serviceIds, ...data }) => {
        const addDeviceResult = await addDevice({
            ...data,
            actionStatus: { label: 'Hoạt động', value: 'running' },
            connectStatus: { label: 'Kết nối', value: 'connecting' },
        });

        const addServiceDeviceResult = await addAllServiceToDevice(data.id, serviceIds);
        console.log(addServiceDeviceResult);

        messageApi.open({ type: addDeviceResult.success ? 'success' : 'error', content: addDeviceResult.message });
    };

    return (
        <>
            {contextHolder}
            <Typography.Title level={3}>Quản lý thiết bị</Typography.Title>
            <div
                css={{
                    paddingBlock: 16,
                    paddingInline: 24,
                    backgroundColor: designToken['colorWhite'],
                    borderRadius: 16,
                }}
            >
                <Typography.Title level={4} css={{ marginTop: 0, marginBottom: 20 }}>
                    Thông tin thiết bị
                </Typography.Title>

                <Form
                    form={form}
                    name='add_device_form'
                    initialValues={{
                        id: 'Kio_01',
                        type: 'kiosk',
                        name: 'Kiosk',
                        usernameDevice: 'Linhkyo011',
                        passwordDevice: '123456789',
                        ipAddress: '128.172.308',
                        serviceIds: ['103', '209'],
                    }}
                    onFinish={handleSubmit}
                >
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
                    <Form.Item<DeviceField> layout='vertical' label='Dịch vụ sử dụng:' name='serviceIds' required>
                        <Select
                            mode='multiple'
                            style={{ width: 'calc(100% - 24px)' }}
                            placeholder='Nhập dịch vụ sử dụng'
                            options={options}
                            suffixIcon={null}
                            tagRender={TagRenderCustom}
                        />
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 54 }}>
                        <span css={{ fontFamily: 'SimSun, sans-serif', color: designToken['colorError'] }}>*</span>
                        <Typography.Text>Là trường thông tin bắt buộc</Typography.Text>
                    </div>
                </Form>
            </div>

            <div css={cssButtonGroupForm}>
                <Button htmlType='button' variant='filled' onClick={() => navigate('/monitor')}>
                    Hủy bỏ
                </Button>
                <Button htmlType='button' onClick={() => form.submit()}>
                    Thêm thiết bị
                </Button>
            </div>
        </>
    );
}

export default AddMonitorPage;
