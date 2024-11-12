import { Form, FormProps, Input, message, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { doc } from 'firebase/firestore';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { cssButtonGroupForm, cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';
import { roleCollection } from '~modules/role';
import { addUser, IUserEntity } from '~modules/user';

type DataForm = Omit<IUserEntity, 'id' | 'role'> & { password: string; passwordConfirm: string; role: string };

function AddUserPage() {
    const loader = useLoaderData() as DefaultOptionType[];
    const [form] = Form.useForm<DataForm>();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFinish: FormProps<DataForm>['onFinish'] = async ({ password, passwordConfirm, role, ...data }) => {
        const roleRef = doc(roleCollection, role);
        const result = await addUser({ ...data, role: roleRef }, password);
        messageApi.open({ type: result.success ? 'success' : 'error', content: result.message });
    };

    return (
        <>
            {contextHolder}
            <Typography.Title level={3}>Quản lý tài khoản</Typography.Title>

            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin tài khoản
                </Typography.Title>

                <Form form={form} onFinish={handleFinish}>
                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<DataForm>
                            layout='vertical'
                            label='Họ tên'
                            name='displayName'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập họ tên' />
                        </Form.Item>

                        <Form.Item<DataForm>
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
                        <Form.Item<DataForm>
                            layout='vertical'
                            label='Số điện thoại'
                            name='phoneNumber'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập số điện thoại' />
                        </Form.Item>

                        <Form.Item<DataForm>
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
                        <Form.Item<DataForm>
                            layout='vertical'
                            label='Email'
                            name='email'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <Input placeholder='Nhập email' />
                        </Form.Item>

                        <Form.Item<DataForm>
                            layout='vertical'
                            label='Nhập lại mật khẩu:'
                            name='passwordConfirm'
                            required
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Nhập nhập lại mật khẩu' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại không đúng'));
                                    },
                                }),
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0 }}
                        >
                            <Input.Password placeholder='Nhập nhập lại mật khẩu' />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 47 }}>
                        <Form.Item<DataForm>
                            layout='vertical'
                            label='Vai trò'
                            name='role'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 24px)', margin: 0, marginRight: 24 }}
                        >
                            <StyledSelect
                                placeholder='Chọn vai trò'
                                options={loader}
                                suffixIcon={<ChevronDownSolidIcon />}
                            />
                        </Form.Item>

                        <Form.Item<DataForm>
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
                    Thêm
                </Button>
            </div>
        </>
    );
}

export default AddUserPage;
