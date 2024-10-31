import { css } from '@emotion/react';
import { Form, Input, Select, Typography } from 'antd';

import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';

const cssItemCol = css({
    display: 'inline-block',
    width: 'calc(50% - 24px)',
});

type FormType = {
    id: string;
    typeDevice: string;
    nameDevice: string;
    usernameDevice: string;
    passwordDevice: string;
    ipAddress: string;
    service: string;
};

function EditMonitorPage() {
    return (
        <>
            <Typography.Title level={3}>Quản lý thiết bị</Typography.Title>
            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin thiết bị
                </Typography.Title>

                <Form
                    initialValues={{
                        id: 'KIO_01',
                        typeDevice: 'kiosk',
                        nameDevice: 'Kiosk',
                        usernameDevice: 'Linhkyo011',
                        passwordDevice: 'CMS',
                        ipAddress: '128.172.308',
                    }}
                >
                    {/* row1 */}
                    <Form.Item>
                        <Form.Item<FormType> layout='vertical' label='Mã thiết bị:' name='id' required css={cssItemCol}>
                            <Input placeholder='Nhập mã thiết bị' />
                        </Form.Item>

                        <Form.Item<FormType>
                            layout='vertical'
                            label='Loại thiết bị:'
                            name='typeDevice'
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
                        <Form.Item<FormType>
                            layout='vertical'
                            label='Tên thiết bị:'
                            name='nameDevice'
                            required
                            css={cssItemCol}
                        >
                            <Input placeholder='Nhập tên thiết bị' />
                        </Form.Item>

                        <Form.Item<FormType>
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
                        <Form.Item<FormType>
                            layout='vertical'
                            label='Địa chỉ IP:'
                            name='ipAddress'
                            required
                            css={cssItemCol}
                        >
                            <Input placeholder='Nhập địa chỉ IP' />
                        </Form.Item>

                        <Form.Item<FormType>
                            layout='vertical'
                            label='Mật khẩu:'
                            name='passwordDevice'
                            required
                            css={[cssItemCol, { marginLeft: 24 }]}
                        >
                            <Input placeholder='Nhập mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    {/* row4 */}
                    <Form.Item<FormType> layout='vertical' label='Dịch vụ sử dụng:' name='service' required>
                        <Input placeholder='Nhập dịch vụ sử dụng' />
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 54 }}>
                        <span css={{ fontFamily: 'SimSun, sans-serif', color: designToken['colorError'] }}>*</span>
                        <Typography.Text>Là trường thông tin bắt buộc</Typography.Text>
                    </div>
                </Form>
            </div>

            <div css={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, marginBottom: 32 }}>
                <Button variant='filled'>Hủy bỏ</Button>
                <Button>Thêm thiết bị</Button>
            </div>
        </>
    );
}

export default EditMonitorPage;
