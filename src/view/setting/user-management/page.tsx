import { Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { Link, useLoaderData } from 'react-router-dom';

import { Select as StyledSelect, Table } from '~components';
import { designToken, texts } from '~core';
import {
    cssFloatButtonAction,
    cssFloatContent,
    cssFloatGroupAction,
    cssFloatIconWrapper,
    cssWidthInputFormSearch,
} from '~css-emotion';
import { AddSquareSolidIcon, ChevronDownSolidIcon } from '~icons';
import { IRoleEntity } from '~modules/role';
import { IUserFireBase } from '~modules/user';

const columns: TableColumnsType<IUserFireBase> = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Họ tên',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        render: (value: IRoleEntity) => value.name,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (value: 'running' | 'stopping') => {
            return (
                <>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            marginRight: 4,
                            borderRadius: '100%',
                            backgroundColor: value === 'running' ? designToken.colorSuccess : '#ec3740',
                        }}
                    />
                    {texts[value]}
                </>
            );
        },
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'user-edit',
        render: (value) => (
            <Link
                to={`/setting/user-management/edit/${value}`}
                style={{ textDecoration: 'underline', color: designToken.colorLink }}
            >
                Cập nhật
            </Link>
        ),
    },
];

function UserManagementPage() {
    const loader = useLoaderData() as IUserFireBase[];

    return (
        <>
            <Typography.Title level={3}>Danh sách tài khoản</Typography.Title>
            <Form name='horizontal_login' layout='inline'>
                <Form.Item
                    layout='vertical'
                    label='Tên vai trò'
                    name='roleUser'
                    initialValue='all'
                    css={cssWidthInputFormSearch}
                >
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='accountant'>Kế toán</Select.Option>
                        <Select.Option value='doctor'>Bác sĩ</Select.Option>
                        <Select.Option value='receptionist'>Lễ tân</Select.Option>
                        <Select.Option value='manager'>Quản lý</Select.Option>
                        <Select.Option value='admin'>Admin</Select.Option>
                        <Select.Option value='supper-admin'>Superadmin</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item
                    layout='vertical'
                    label='Từ khoá'
                    name='searchTerm'
                    css={[cssWidthInputFormSearch, { marginLeft: 'auto' }]}
                >
                    <Input.Search placeholder='Nhập từ khóa' />
                </Form.Item>
            </Form>

            <Table dataSource={loader} columns={columns} />

            <div css={cssFloatGroupAction}>
                <Link to='/setting/user-management/add'>
                    <div css={cssFloatButtonAction}>
                        <div css={cssFloatIconWrapper}>
                            <AddSquareSolidIcon />
                        </div>
                        <span css={cssFloatContent}>Thêm tài khoản</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default UserManagementPage;
