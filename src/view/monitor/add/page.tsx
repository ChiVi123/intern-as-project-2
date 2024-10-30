import { css } from '@emotion/react';
import { Form, Input, Select, Typography } from 'antd';
import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { ChevronDownSolidIcon } from '~icons';

const cssItemCol = css({
    display: 'inline-block',
    width: 'calc(50% - 24px)',
});

function AddMonitorPage() {
    return (
        <>
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

                <Form>
                    {/* row1 */}
                    <Form.Item>
                        <Form.Item layout='vertical' label='Mã thiết bị:' required css={cssItemCol}>
                            <Input name='id' placeholder='Nhập mã thiết bị' />
                        </Form.Item>

                        <Form.Item
                            layout='vertical'
                            label='Loại thiết bị:'
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
                        <Form.Item layout='vertical' label='Tên thiết bị:' required css={cssItemCol}>
                            <Input name='name' placeholder='Nhập tên thiết bị' />
                        </Form.Item>

                        <Form.Item
                            layout='vertical'
                            label='Tên đăng nhập:'
                            required
                            css={[cssItemCol, { marginLeft: 24 }]}
                        >
                            <Input name='usernameDevice' placeholder='Nhập tài khoản' />
                        </Form.Item>
                    </Form.Item>

                    {/* row3 */}
                    <Form.Item>
                        <Form.Item layout='vertical' label='Địa chỉ IP:' required css={cssItemCol}>
                            <Input name='ipAddress' placeholder='Nhập địa chỉ IP' />
                        </Form.Item>

                        <Form.Item layout='vertical' label='Mật khẩu:' required css={[cssItemCol, { marginLeft: 24 }]}>
                            <Input name='passwordDevice' placeholder='Nhập mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    {/* row4 */}
                    <Form.Item layout='vertical' label='Dịch vụ sử dụng:' required>
                        <Input name='ipAddress' placeholder='Nhập dịch vụ sử dụng' />
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

export default AddMonitorPage;
