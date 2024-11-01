import { CheckboxOptionType, Form, FormProps, Input, Typography } from 'antd';
import { Button } from '~components';
import { designToken } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';
import { CheckboxGroup } from '../components';

interface IDataForm {
    name: string;
    description: string;
    featureGroups: string[][];
}

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
    const [form] = Form.useForm<IDataForm>();

    const handleFinish: FormProps<IDataForm>['onFinish'] = (value) => {
        console.log(value);
    };

    return (
        <>
            <Typography.Title level={3}>Thêm vai trò</Typography.Title>

            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin vai trò
                </Typography.Title>

                <Form
                    form={form}
                    layout='inline'
                    initialValues={{
                        name: 'Kế toán',
                        description: 'Chịu trách nhiệm thống kê số liệu và kiểm toán',
                        featureGroups: [['feature-a-x', 'feature-a-z'], ['feature-b-y']],
                    }}
                    onFinish={handleFinish}
                >
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
                            css={{
                                '::-webkit-scrollbar': {
                                    width: 4,
                                },
                                '::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    background: designToken['orange-200'],
                                    borderRadius: 2,
                                },
                            }}
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

                            <Form.Item name={['featureGroups', 0]}>
                                <CheckboxGroup options={optionsA} />
                            </Form.Item>

                            <Typography.Title level={4} css={cssHeading} style={{ marginTop: 24 }}>
                                Nhóm chức năng B
                            </Typography.Title>

                            <Form.Item name={['featureGroups', 1]}>
                                <CheckboxGroup options={optionsB} />
                            </Form.Item>
                        </div>
                    </Form.Item>
                </Form>
            </div>

            <div css={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, marginBottom: 32 }}>
                <Button htmlType='button' variant='filled'>
                    Hủy bỏ
                </Button>
                <Button htmlType='button' onClick={() => form.submit()}>
                    Thêm thiết bị
                </Button>
            </div>
        </>
    );
}

export default EditRoleUserPage;
