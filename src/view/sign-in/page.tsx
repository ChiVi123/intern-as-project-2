import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { designToken, useAppDispatch } from '~core';
import { fetchSignIn, userSelectors } from '~modules/user';

type FieldType = {
    username?: string;
    password?: string;
};

function SignInPage() {
    const { data, loading, error } = useSelector(userSelectors.state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loading === 'fulfilled') {
            console.log(data);
        }
    }, [data, loading]);

    const handleFinish: FormProps<FieldType>['onFinish'] = async ({ username, password }) => {
        await dispatch(fetchSignIn({ email: username! + '@as.intern', password: password! }));
    };

    return (
        <Flex>
            <div css={{ flex: '1', display: 'flex', alignItems: 'center', paddingInline: 16 }}>
                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{ remember: true }}
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
                        validateStatus='error'
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
            </div>

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
