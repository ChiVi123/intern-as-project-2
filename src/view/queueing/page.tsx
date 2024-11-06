import { DatePicker, Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { useMemo } from 'react';

import { LinkFloatAside, Select as StyledSelect, Table } from '~components';
import { designToken } from '~core';
import { cssWidthInputFormSearch } from '~css-emotion';
import { AddSquareSolidIcon, ChevronDownSolidIcon } from '~icons';

interface DataType {
    id: string;
    guestName: string;
    serviceName: string;
    createdAt: string;
    expiredAt: string;
    status: string;
    device: string;
}

const randomNumber = (to: number) => Math.floor(Math.random() * to);
const generateRandomDate = (start: string, end: string) => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const randomTime = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTime);
};
const formatDate = () =>
    generateRandomDate('2024-01-01', '2024-12-31').toLocaleDateString('vi', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

const names = [
    'Lê Huỳnh Ái Vân',
    'Huỳnh Ái Vân',
    'Lê Ái Vân',
    'Nguyễn Ái Vân',
    'Trần Thị Ái Vân',
    'Lê Huỳnh Nghĩa',
    'Lê Huỳnh Đức',
    'Phạm Văn Mạnh',
    'Lê Thị Cẩm Tiên',
];
const statuses = ['Đang chờ', 'Đã sử dụng', 'Bỏ qua'];
const devices = ['Kiosk', 'Hệ thống'];
const services = [
    'Khám tim mạch',
    'Khám sản - Phụ Khoa',
    'Khám răng hàm mặt',
    'Khám tai mũi họng',
    'Khám hô hấp',
    'Khám tổng quát  ',
];

const columns: TableColumnsType<DataType> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'guestName',
        key: 'guestName',
    },
    {
        title: 'Tên dịch vụ ',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Thời gian cấp',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Hạn sử dụng',
        dataIndex: 'expiredAt',
        key: 'expiredAt',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
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
                            backgroundColor:
                                value === 'Đang chờ'
                                    ? designToken.colorInfo
                                    : value === 'Đã sử dụng'
                                    ? designToken['gray-300']
                                    : designToken.colorError,
                        }}
                    ></span>
                    {value}
                </>
            );
        },
    },
    {
        title: 'Nguồn cấp',
        dataIndex: 'device',
        key: 'device',
    },
];

function QueueingPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: '201' + i.toString().padStart(3, '0'),
                guestName: names[randomNumber(names.length)],
                status: statuses[randomNumber(statuses.length)],
                device: devices[randomNumber(devices.length)],
                createdAt: formatDate(),
                expiredAt: formatDate(),
                serviceName: services[randomNumber(services.length)],
            })),
        [],
    );
    return (
        <>
            <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>

            <Form name='queueing_search' layout='inline'>
                <Form.Item layout='vertical' label='Tên dịch vụ' name='serviceName' initialValue='all'>
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='kham-san---phu-khoa'>Khám sản - Phụ khoa</Select.Option>
                        <Select.Option value='kham-rang-ham-mat'>Khám răng hàm mặt</Select.Option>
                        <Select.Option value='kham-tai-mui-hong'>Khám tai mũi họng</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item layout='vertical' label='Tình trạng' name='status' initialValue='all'>
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='pending'>Đang chờ</Select.Option>
                        <Select.Option value='used'>Đã sử dụng</Select.Option>
                        <Select.Option value='passed'>Bỏ qua</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item layout='vertical' label='Nguồn cấp' name='device' initialValue='all'>
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='kiosk'>Kiosk</Select.Option>
                        <Select.Option value='system'>Hệ thống</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item layout='vertical' label='Chọn thời gian' name='rangeDate'>
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

            <LinkFloatAside to='/queueing/add' title='Cấp số mới' icon={AddSquareSolidIcon} />
        </>
    );
}

export default QueueingPage;
