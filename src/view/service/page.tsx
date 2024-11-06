import { DatePicker, Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { LinkFloatAside, Select as StyledSelect, Table } from '~components';
import { designToken } from '~core';
import { cssWidthInputFormSearch } from '~css-emotion';
import { AddSquareSolidIcon, ChevronDownSolidIcon } from '~icons';

interface DataType {
    id: string;
    name: string;
    description: string;
    actionStatus: string;
}
const randomNumber = (to: number) => Math.floor(Math.random() * to);
const names = ['Fannie', 'Derrick', 'Bill', 'Edith', 'Myrtle', 'Jorge', 'Tommy', 'Tom', 'Alvin', 'Fannie'];
const actionStatuses = ['Hoạt động', 'Ngưng hoạt động'];

const columns: TableColumnsType<DataType> = [
    {
        title: 'Mã thiết bị',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'actionStatus',
        key: 'actionStatus',
        render: (value: string) => {
            return (
                <>
                    <span
                        css={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            marginRight: 4,
                            borderRadius: '100%',
                            backgroundColor: value === 'Hoạt động' ? designToken.colorSuccess : '#ec3740',
                        }}
                    ></span>
                    {value}
                </>
            );
        },
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'service-detail',
        render: (value) => (
            <Link to={`/service/${value}`} style={{ textDecoration: 'underline', color: designToken.colorLink }}>
                Chi tiết
            </Link>
        ),
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'service-edit',
        render: (value) => (
            <Link to={`/service/edit/${value}`} style={{ textDecoration: 'underline', color: designToken.colorLink }}>
                Cập nhật
            </Link>
        ),
    },
];

function ServicePage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: 'KIO_0' + i,
                name: names[randomNumber(names.length)],
                actionStatus: actionStatuses[randomNumber(actionStatuses.length)],
                description: 'Mô tả dịch vụ ' + i,
            })),
        [],
    );
    return (
        <>
            <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>

            <Form name='service_search' layout='inline'>
                <Form.Item
                    layout='vertical'
                    label='Trạng thái hoạt động'
                    name='actionStatus'
                    initialValue='all'
                    css={cssWidthInputFormSearch}
                >
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='running'>Hoạt động</Select.Option>
                        <Select.Option value='stopping'>Ngưng hoạt động</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item layout='vertical' label='Chọn thời gian'>
                    <DatePicker.RangePicker />
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

            <LinkFloatAside to='/service/add' title='Thêm dịch vụ' icon={AddSquareSolidIcon} />
        </>
    );
}

export default ServicePage;
