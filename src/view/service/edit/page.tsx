import { Checkbox, Flex, Form, FormProps, Input, InputNumber, message, Typography } from 'antd';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button } from '~components';
import { designToken, ResponseErrorRepo, ResponseRepo } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';
import { editServiceById, IServiceEntity } from '~modules/service';

type ServiceField = {
    id: string;
    name: string;
    description: string;
    rule: {
        autoIncrement: { active: boolean; start: number; end: number };
        prefix: { active: boolean; value: string };
        suffix: { active: boolean; value: string };
        reset: boolean;
    };
};
const defaultValues: ServiceField = {
    id: '',
    name: '',
    description: '',
    rule: {
        autoIncrement: { active: false, start: 1, end: 9999 },
        prefix: { active: false, value: '0001' },
        suffix: { active: false, value: '0001' },
        reset: false,
    },
};

function EditServicePage() {
    const [messageApi, contextHolder] = message.useMessage();
    const loader = useLoaderData() as ResponseRepo<IServiceEntity> | ResponseErrorRepo;
    const initialValues = useMemo<ServiceField>(() => {
        if (loader instanceof ResponseErrorRepo) {
            return defaultValues;
        }
        if (!loader.data) {
            return defaultValues;
        }
        const { data } = loader;
        const formData: ServiceField = {
            ...data,
            rule: {
                autoIncrement: { ...data.rule.autoIncrement, active: true },
                prefix: { value: data.rule.prefix, active: true },
                suffix: { value: data.rule.suffix, active: true },
                reset: data.rule.reset,
            },
        };
        return formData;
    }, [loader]);
    const [form] = Form.useForm();

    const handleSubmit: FormProps<ServiceField>['onFinish'] = async ({ id, rule, ...rest }) => {
        const {
            autoIncrement: { active: activeIncrement, ...autoIncrement },
            prefix: { active: activePrefix, ...prefix },
            suffix: { active: activeSuffix, ...suffix },
        } = rule;

        const data: Omit<IServiceEntity, 'id'> = {
            ...rest,
            status: { label: 'Hoạt động', value: 'running' },
            rule: {
                autoIncrement: activeIncrement ? autoIncrement : initialValues.rule.autoIncrement,
                prefix: activePrefix ? prefix.value : initialValues.rule.prefix.value,
                suffix: activeSuffix ? suffix.value : initialValues.rule.suffix.value,
                reset: rule.reset,
            },
        };

        const result = await editServiceById(id, data);
        messageApi.open({ type: result.success ? 'success' : 'error', content: result.message });
    };

    return (
        <>
            {contextHolder}

            <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>

            <div css={cssPaper}>
                <Form form={form} name='edit_service_root' initialValues={initialValues} onFinish={handleSubmit}>
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

                            <Form.Item name={['rule', 'autoIncrement', 'start']} style={{ margin: 0 }}>
                                <InputNumber
                                    formatter={(value) => value?.toString().padStart(4, '0') || ''}
                                    style={{ display: 'inline-block', minWidth: 60 }}
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                            </Form.Item>

                            <span>đến</span>

                            <Form.Item name={['rule', 'autoIncrement', 'end']} style={{ margin: 0 }}>
                                <InputNumber
                                    formatter={(value) => value?.toString().padStart(4, '0') || ''}
                                    style={{ display: 'inline-block', minWidth: 60 }}
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
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

                            <Form.Item name={['rule', 'prefix', 'value']} style={{ margin: 0 }}>
                                <Input style={{ display: 'inline-block', width: 60 }} />
                            </Form.Item>
                        </Flex>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 12 }}>
                        <Flex align='center' gap={12}>
                            <Form.Item<ServiceField>
                                name={['rule', 'suffix', 'active']}
                                valuePropName='checked'
                                style={{ minWidth: 138, margin: 0 }}
                            >
                                <Checkbox>
                                    <Typography.Text strong style={{ display: 'inline-block' }}>
                                        Suffix:
                                    </Typography.Text>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item<ServiceField> name={['rule', 'suffix', 'value']} style={{ margin: 0 }}>
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
