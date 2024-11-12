import { Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Select as StyledSelect, Table } from '~components';
import { designToken } from '~core';
import {
    cssFloatButtonAction,
    cssFloatContent,
    cssFloatGroupAction,
    cssFloatIconWrapper,
    cssWidthInputFormSearch,
} from '~css-emotion';
import { AddSquareSolidIcon, ChevronDownSolidIcon } from '~icons';

interface DataType {
    id: string;
    username: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    roleUser: string;
    status: string;
}

const randomNumber = (to: number) => Math.floor(Math.random() * to);
const firstNames = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];
const phones = [
    '0952877038',
    '0942003627',
    '0942212841',
    '0913836129',
    '0913922489',
    '0974158510',
    '0987120230',
    '0972706344',
    '0918476874',
];
const statuses = ['Hoạt động', 'Ngưng hoạt động'];
const roleUsers = ['Kế toán', 'Bác sĩ', 'Lễ tân', 'Quản lý', 'Admin', 'Superadmin'];
const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Họ tên',
        dataIndex: 'fullName',
        key: 'fullName',
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
        dataIndex: 'roleUser',
        key: 'roleUser',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (value: string) => {
            return (
                <>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            marginRight: 4,
                            borderRadius: '100%',
                            backgroundColor: value === 'Hoạt động' ? designToken.colorSuccess : '#ec3740',
                        }}
                    />
                    {value}
                </>
            );
        },
    },
];

function UserManagementPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: i.toString(),
                username: 'tuyetnguyen@1' + i,
                fullName: 'Nguyen Văn ' + firstNames[randomNumber(firstNames.length)],
                email: 'tuyetnguyen' + i.toString().padStart(3, '0') + '@gmail.com',
                phoneNumber: phones[randomNumber(phones.length)],
                roleUser: roleUsers[randomNumber(roleUsers.length)],
                status: statuses[randomNumber(statuses.length)],
            })),
        [],
    );
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

            <Table dataSource={dataSource} columns={columns} />

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
