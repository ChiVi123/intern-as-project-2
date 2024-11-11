import { CheckboxOptionType, Form, FormProps, Input, message, Typography } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Button } from '~components';
import { designToken, ResponseErrorRepo } from '~core';
import { cssButtonGroupForm, cssHeading, cssPaper, cssScrollbar } from '~css-emotion';
import { editRoleById, IRoleEntity } from '~modules/role';

import { CheckboxGroup } from '../components';

const optionsA: CheckboxOptionType<string>[] = [
    { label: 'Chức năng A x', value: 'feature-a-x' },
    { label: 'Chức năng A y', value: 'feature-a-y' },
    { label: 'Chức năng A z', value: 'feature-a-z' },
];
const optionsB: CheckboxOptionType<string>[] = [
    { label: 'Chức năng B x', value: 'feature-b-x' },
    { label: 'Chức năng B y', value: 'feature-b-y' },
    { label: 'Chức năng B z', value: 'feature-b-z' },
];

function EditRoleUserPage() {
    const loader = useLoaderData() as IRoleEntity;
    const [form] = Form.useForm<IRoleEntity>();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleFinish: FormProps<IRoleEntity>['onFinish'] = async (value) => {
        const result = await editRoleById(loader.id, value);
        if (result instanceof ResponseErrorRepo) {
            console.log(result.error);
        }
        messageApi.open({ type: result.success ? 'success' : 'error', content: result.message });
        // Chịu trách nhiệm thống kê số liệu và kiểm toán
    };

    return (
        <>
            {contextHolder}
            <Typography.Title level={3}>Thêm vai trò</Typography.Title>

            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin vai trò
                </Typography.Title>

                <Form form={form} layout='inline' initialValues={loader} onFinish={handleFinish}>
                    <Form.Item style={{ flex: 1 }}>
                        <Form.Item
                            layout='vertical'
                            label='Tên vai trò'
                            name='name'
                            required
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder='Nhập tên vai trò' />
                        </Form.Item>

                        <Form.Item layout='vertical' label='Mô tả:' name='description'>
                            <Input.TextArea rows={7} placeholder='Nhập mô tả' />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item layout='vertical' label='Phân quyền chức năng' required>
                        <div
                            css={cssScrollbar}
                            style={{
                                width: 560,
                                height: 420,
                                paddingBlock: 16,
                                paddingInline: 24,
                                backgroundColor: designToken['orange-50'],
                                borderRadius: 8,
                                overflowY: 'auto',
                            }}
                        >
                            <Typography.Title level={4} css={cssHeading}>
                                Nhóm chức năng A
                            </Typography.Title>

                            <Form.Item name={['featureGroups', 'feature-a']}>
                                <CheckboxGroup options={optionsA} />
                            </Form.Item>

                            <Typography.Title level={4} css={cssHeading} style={{ marginTop: 24 }}>
                                Nhóm chức năng B
                            </Typography.Title>

                            <Form.Item name={['featureGroups', 'feature-b']}>
                                <CheckboxGroup options={optionsB} />
                            </Form.Item>
                        </div>
                    </Form.Item>
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

export default EditRoleUserPage;
