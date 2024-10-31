import { Checkbox, Flex, Form, FormProps, Input, Typography } from 'antd';
import { Button } from '~components';
import { designToken } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';

function EditServicePage() {
    const [form] = Form.useForm();
    const handleSubmit: FormProps['onFinish'] = (value) => {
        console.log(value);
    };
    return (
        <>
            <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>

            <div css={cssPaper}>
                <Form form={form} name='edit_service_root' onFinish={handleSubmit}>
                    <Typography.Title level={4} css={cssHeading} style={{ marginBottom: 12 }}>
                        Thông tin dịch vụ
                    </Typography.Title>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                            <Form.Item layout='vertical' label='Mã dịch vụ:' name='id' required>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                layout='vertical'
                                label='Tên dịch vụ:'
                                name='name'
                                required
                                style={{ marginTop: 48 }}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            layout='vertical'
                            label='Mô tả:'
                            name='description'
                            required
                            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: 24 }}
                        >
                            <Input.TextArea placeholder='Mô tả dịch vụ' rows={5} />
                        </Form.Item>
                    </Form.Item>

                    <Typography.Title level={4} css={cssHeading} style={{ marginBottom: 12 }}>
                        Quy tắc cấp số
                    </Typography.Title>

                    <Form.Item style={{ marginBottom: 12 }}>
                        <Flex align='center' gap={12}>
                            <Form.Item
                                name={['rule', 'autoIncrement', 'active']}
                                valuePropName='checked'
                                style={{ minWidth: 138, margin: 0 }}
                            >
                                <Checkbox>
                                    <Typography.Text strong style={{ display: 'inline-block' }}>
                                        Tăng tự động từ:
                                    </Typography.Text>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item
                                name={['rule', 'autoIncrement', 'start']}
                                initialValue='0001'
                                style={{ margin: 0 }}
                            >
                                <Input style={{ display: 'inline-block', width: 60 }} />
                            </Form.Item>

                            <span>đến</span>

                            <Form.Item
                                name={['rule', 'autoIncrement', 'end']}
                                initialValue='9999'
                                style={{ margin: 0 }}
                            >
                                <Input style={{ display: 'inline-block', width: 60 }} />
                            </Form.Item>
                        </Flex>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 12 }}>
                        <Flex align='center' gap={12}>
                            <Form.Item
                                name={['rule', 'prefix', 'active']}
                                valuePropName='checked'
                                style={{ minWidth: 138, margin: 0 }}
                            >
                                <Checkbox>
                                    <Typography.Text strong style={{ display: 'inline-block' }}>
                                        Prefix:
                                    </Typography.Text>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item name={['rule', 'prefix', 'value']} initialValue='0001' style={{ margin: 0 }}>
                                <Input style={{ display: 'inline-block', width: 60 }} />
                            </Form.Item>
                        </Flex>
                    </Form.Item>

                    <Form.Item name={['rule', 'reset']} valuePropName='checked' style={{ marginBottom: 12 }}>
                        <Checkbox style={{ minWidth: 138, margin: 0 }}>
                            <Typography.Text strong style={{ display: 'inline-block' }}>
                                Reset mỗi ngày
                            </Typography.Text>
                        </Checkbox>
                    </Form.Item>

                    <div css={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <span css={{ fontFamily: 'SimSun, sans-serif', color: designToken['colorError'] }}>*</span>
                        <Typography.Text>Là trường thông tin bắt buộc</Typography.Text>
                    </div>
                </Form>
            </div>

            <div css={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, marginBottom: 32 }}>
                <Button variant='filled'>Hủy bỏ</Button>
                <Button onClick={() => form.submit()}>Cập nhật</Button>
            </div>
        </>
    );
}

export default EditServicePage;
