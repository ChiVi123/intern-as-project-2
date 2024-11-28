import { DatePicker, Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { Timestamp } from 'firebase/firestore';
import { Link, useLoaderData } from 'react-router-dom';

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
import { IQueueingEntity } from '~modules/queueing';
import { IServiceEntity } from '~modules/service';
import { formatDate } from '~utils';

const columns: TableColumnsType<IQueueingEntity> = [
    {
        title: 'STT',
        dataIndex: 'ordinalNumber',
        key: 'ordinalNumber',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'guestName',
        key: 'guestName',
    },
    {
        title: 'Tên dịch vụ ',
        dataIndex: 'service',
        key: 'service',
        render: (value: IServiceEntity) => value.name,
    },
    {
        title: 'Thời gian cấp',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: Timestamp) => formatDate(value.toDate()),
    },
    {
        title: 'Hạn sử dụng',
        dataIndex: 'expired',
        key: 'expired',
        render: (value: Timestamp) => formatDate(value.toDate()),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: ({ label, value }: { label: string; value: string }) => {
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
                                value === 'pending'
                                    ? designToken.colorInfo
                                    : value === 'used'
                                    ? designToken['gray-300']
                                    : designToken.colorError,
                        }}
                    ></span>
                    {label}
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
    const loader = useLoaderData() as IQueueingEntity[];

    return (
        <>
            <Typography.Title level={3}>Quản lý cấp số</Typography.Title>

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

            <Table dataSource={loader} columns={columns} />

            <div css={cssFloatGroupAction}>
                <Link to='/queueing/add'>
                    <div css={cssFloatButtonAction}>
                        <div css={cssFloatIconWrapper}>
                            <AddSquareSolidIcon />
                        </div>
                        <span css={cssFloatContent}>Cấp số mới</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default QueueingPage;
