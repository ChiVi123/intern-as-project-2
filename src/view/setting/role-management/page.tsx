import { Form, Input, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { designToken } from '~core';
import {
    cssFloatButtonAction,
    cssFloatContent,
    cssFloatGroupAction,
    cssFloatIconWrapper,
    cssWidthInputFormSearch,
} from '~css-emotion';
import { AddSquareSolidIcon } from '~icons';

interface DataType {
    id: string;
    role: string;
    numberOfRoles: number;
    description: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Số người dùng',
        dataIndex: 'numberOfRoles',
        key: 'numberOfRoles',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
];

const roles = ['Kế toán', 'Bác sĩ', 'Lễ tân', 'Quản lý', 'Admin', 'Superadmin'];

function RoleManagementPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 6 }).map<DataType>((_, i) => ({
                id: i.toString().padStart(2, '0'),
                role: roles[i],
                numberOfRoles: 6,
                description: 'Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu',
            })),
        [],
    );
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

            <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                rowHoverable={false}
                pagination={false}
                rowKey={'id'}
                css={{
                    marginTop: 16,
                    '&.ant-table-wrapper .ant-table-row:nth-of-type(even)': {
                        backgroundColor: designToken['orange-50'],
                    },
                }}
            />

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
