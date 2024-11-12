import { Avatar, Col, Flex, Form, Input, Row } from 'antd';
import { useSelector } from 'react-redux';

import { designToken } from '~core';
import { CameraOutlinedIcon } from '~icons';
import { IRoleEntity } from '~modules/role';
import { userSelectors } from '~modules/user';

function ProfilePage() {
    const currentUser = useSelector(userSelectors.data);
    return (
        <div
            css={{ paddingBlock: 40, paddingInline: 24, backgroundColor: designToken['colorWhite'], borderRadius: 12 }}
        >
            <Flex gap={24}>
                <div css={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                    <div css={{ position: 'relative' }}>
                        <Avatar src={currentUser?.photoURL} alt='user' size={248} />
                        <div
                            css={{
                                position: 'absolute',
                                right: 32,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 45,
                                height: 45,
                                backgroundColor: designToken['orange-500'],
                                border: `2px solid ${designToken['colorWhite']}`,
                                borderRadius: '100%',
                            }}
                        >
                            <CameraOutlinedIcon
                                css={{ marginLeft: 1, fontSize: 30, color: designToken['colorWhite'] }}
                            />
                        </div>
                    </div>
                    <span css={{ fontSize: 24, fontWeight: 700, lineHeight: 1.5 }}>{currentUser?.username}</span>
                </div>

                <div css={{ flex: '1' }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label='Tên người dùng:' layout='vertical'>
                                <Input disabled defaultValue={currentUser?.username || ''} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Tên đăng nhập:' layout='vertical'>
                                <Input disabled defaultValue={currentUser?.username || ''} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Số điện thoại:' layout='vertical'>
                                <Input disabled defaultValue={currentUser?.phoneNumber || ''} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Mật khẩu:' layout='vertical'>
                                <Input disabled defaultValue={'****************'} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Email:' layout='vertical'>
                                <Input disabled defaultValue={currentUser?.email || ''} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Vai trò:' layout='vertical'>
                                <Input disabled defaultValue={(currentUser?.role as IRoleEntity).name} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Flex>
        </div>
    );
}

export default ProfilePage;
