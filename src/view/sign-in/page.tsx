import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { designToken, useAppDispatch } from '~core';
import { fetchSignIn, userActions, userSelectors } from '~modules/user';

type FieldType = {
    username: string;
    password: string;
};

function SignInPage() {
    const { loading, error } = useSelector(userSelectors.state);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    useEffect(() => {
        if (loading === 'fulfilled') {
            navigate('/profile');
        }
    }, [loading, navigate]);

    const handleFinish: FormProps<FieldType>['onFinish'] = async ({ username, password }) => {
        await dispatch(fetchSignIn({ username, password }));
    };

    return (
        <Flex>
            <Flex
                flex={1}
                vertical
                justify='center'
                gap={16}
                css={{
                    paddingInline: 16,
                }}
            >
                {import.meta.env.MODE === 'production' && (
                    <Alert
                        message={
                            <>
                                Tài khoản <strong>user1</strong> với mật khẩu <strong>123456789</strong>
                            </>
                        }
                        type='success'
                        showIcon
                    />
                )}

                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={
                        import.meta.env.MODE === 'production'
                            ? { username: 'user1', password: '123456789' }
                            : { username: '', password: '' }
                    }
                    autoComplete='off'
                    onFinish={handleFinish}
                    css={{ width: 400, marginInline: 'auto' }}
                >
                    <Form.Item<FieldType>
                        label='Tên đăng nhập'
                        name='username'
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label='Mật khẩu'
                        name='password'
                        validateStatus={error ? 'error' : ''}
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        help={
                            error ? (
                                <>
                                    <ExclamationCircleOutlined style={{ marginRight: 6 }} />
                                    {error}
                                </>
                            ) : undefined
                        }
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 24 }}
                        css={{ '.ant-form-item-control-input-content': { textAlign: 'center' } }}
                    >
                        <Button
                            variant='solid'
                            color='primary'
                            htmlType='submit'
                            loading={loading === 'pending'}
                            css={{ minWidth: 162, height: 40 }}
                        >
                            Đăng nhập
                        </Button>
                        <div css={{ marginTop: 6 }}>
                            <Link to='#!'>
                                <Typography.Text css={{ color: designToken['orange-500'] }}>
                                    Quên mật khẩu?
                                </Typography.Text>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Flex>

            <div css={{ position: 'relative', width: '58.89%', minHeight: '100vh', backgroundColor: '#fff' }}>
                <img
                    src='https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/image-sign-in-up-min.png?alt=media&token=b930978c-c765-4c95-bbf1-8bc966f55d9b'
                    alt=''
                    css={{ width: '71.34%', marginTop: '14%', marginLeft: '10%' }}
                />
                <div
                    css={{
                        position: 'absolute',
                        top: '50%',
                        right: '3.89%',
                        '& > div': { margin: 0, lineHeight: 1.5, color: designToken['orange-500'] },
                    }}
                >
                    <Typography.Paragraph
                        css={{
                            fontSize: 34,
                            fontWeight: 400,
                        }}
                    >
                        Hệ thống
                    </Typography.Paragraph>

                    <Typography.Paragraph css={{ fontSize: 36, fontWeight: 900 }}>
                        QUẢN LÝ XẾP HÀNG
                    </Typography.Paragraph>
                </div>
            </div>
        </Flex>
    );
}

export default SignInPage;
