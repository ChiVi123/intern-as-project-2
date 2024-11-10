import { Form, FormProps, Input, Select, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { cssButtonGroupForm, cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';

interface IDataForm {
    id: string;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    passwordConfirm: string;
    roleUser: string;
    status: string;
}

function EditUserPage() {
    const [form] = Form.useForm<IDataForm>();
    const navigate = useNavigate();

    const handleFinish: FormProps['onFinish'] = (value) => {
        console.log(value);
    };

    return (
        <>
            <Typography.Title level={3}>Quản lý tài khoản</Typography.Title>

            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin tài khoản
                </Typography.Title>

                <Form
                    form={form}
                    initialValues={{
                        fullName: 'Nguyen Van A',
                        username: 'tuyetnguyen123',
                        phoneNumber: '0902345678',
                        password: 'Tuyetnguyen12',
                        email: 'NguyenA154@gmail.com',
                        passwordConfirm: 'Tuyetnguyen12',
                        roleUser: 'accountant',
                        status: 'stopping',
                    }}
                    onFinish={handleFinish}
                >
                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Họ tên'
                            name='fullName'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập họ tên' />
                        </Form.Item>

                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Tên đăng nhập:'
                            name='username'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0 }}
                        >
                            <Input placeholder='Nhập tên đăng nhập' />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Số điện thoại'
                            name='phoneNumber'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập số điện thoại' />
                        </Form.Item>

                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Mật khẩu:'
                            name='password'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0 }}
                        >
                            <Input.Password placeholder='Nhập mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Email'
                            name='email'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập email' />
                        </Form.Item>

                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Nhập lại mật khẩu:'
                            name='passwordConfirm'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0 }}
                        >
                            <Input.Password placeholder='Nhập nhập lại mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Vai trò'
                            name='roleUser'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <StyledSelect placeholder='Chọn vai trò' suffixIcon={<ChevronDownSolidIcon />}>
                                <Select.Option value='accountant'>Kế toán</Select.Option>
                                <Select.Option value='doctor'>Bác sĩ</Select.Option>
                                <Select.Option value='receptionist'>Lễ tân</Select.Option>
                                <Select.Option value='manager'>Quản lý</Select.Option>
                                <Select.Option value='admin'>Admin</Select.Option>
                                <Select.Option value='supper-admin'>Superadmin</Select.Option>
                            </StyledSelect>
                        </Form.Item>

                        <Form.Item<IDataForm>
                            layout='vertical'
                            label='Tình trạng:'
                            name='status'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0 }}
                        >
                            <StyledSelect placeholder='Chọn tình trạng' suffixIcon={<ChevronDownSolidIcon />}>
                                <Select.Option value='running'>Hoạt động</Select.Option>
                                <Select.Option value='stopping'>Ngưng hoạt động</Select.Option>
                            </StyledSelect>
                        </Form.Item>
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center' }}>
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

export default EditUserPage;
