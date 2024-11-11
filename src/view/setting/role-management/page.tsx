import { Form, Input, TableColumnsType } from 'antd';
import { Link, useLoaderData } from 'react-router-dom';
import { Table } from '~components';
import { designToken } from '~core';

import {
    cssFloatButtonAction,
    cssFloatContent,
    cssFloatGroupAction,
    cssFloatIconWrapper,
    cssWidthInputFormSearch,
} from '~css-emotion';
import { AddSquareSolidIcon } from '~icons';
import { IRoleEntity } from '~modules/role';

const columns: TableColumnsType<IRoleEntity> = [
    {
        title: 'Tên vai trò',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số người dùng',
        dataIndex: 'numberOfRoles',
        key: 'numberOfRoles',
        render: () => 0,
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'role-edit',
        render: (value) => (
            <Link
                to={`/setting/role-management/edit/${value}`}
                style={{ textDecoration: 'underline', color: designToken.colorLink }}
            >
                Cập nhật
            </Link>
        ),
    },
];

function RoleManagementPage() {
    const loader = useLoaderData() as IRoleEntity[];

    return (
        <>
            <Form name='inline_search' layout='inline'>
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
                <Link to='/setting/role-management/add'>
                    <div css={cssFloatButtonAction}>
                        <div css={cssFloatIconWrapper}>
                            <AddSquareSolidIcon />
                        </div>
                        <span css={cssFloatContent}>Thêm vai trò</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default RoleManagementPage;
