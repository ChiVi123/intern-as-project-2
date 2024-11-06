import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Form, Input, Select, Table, TableColumnsType, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { ChevronDownSolidIcon } from '~icons';

interface DataType {
    id: string;
    name: string;
    ipAddress: string;
    actionStatus: string;
    connectStatus: string;
    service: string;
}

const randomNumber = (to: number) => Math.floor(Math.random() * to);
const names = ['Fannie', 'Derrick', 'Bill', 'Edith', 'Myrtle', 'Jorge', 'Tommy', 'Tom', 'Alvin', 'Fannie'];
const ipAddresses = [
    '15.143.49.175',
    '222.91.172.155',
    '144.83.164.161',
    '159.229.156.98',
    '7.209.77.198',
    '171.233.77.200',
    '44.200.5.58',
    '245.88.151.135',
    '239.242.208.170',
    '177.50.65.135',
];
const actionStatuses = ['Hoạt động', 'Ngưng hoạt động'];
const connectStatuses = ['Kết nối', 'Mất kết nối'];

const columns: TableColumnsType<DataType> = [
    {
        title: 'Mã thiết bị',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên thiết bị',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Địa chỉ IP',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
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
        title: 'Trạng thái kết nối',
        dataIndex: 'connectStatus',
        key: 'connectStatus',
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
                            backgroundColor: value === 'Kết nối' ? designToken.colorSuccess : '#ec3740',
                        }}
                    ></span>
                    {value}
                </>
            );
        },
    },
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'service',
        key: 'service',
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'monitor-detail',
        render: (value) => (
            <Link to={`/monitor/${value}`} style={{ textDecoration: 'underline', color: designToken.colorLink }}>
                Chi tiết
            </Link>
        ),
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'monitor-detail',
        render: (value) => (
            <Link to={`/monitor/edit/${value}`} style={{ textDecoration: 'underline', color: designToken.colorLink }}>
                Cập nhật
            </Link>
        ),
    },
];

const styledFormItem = css({
    minWidth: 260,
});

function MonitorPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: 'KIO_0' + i,
                name: names[randomNumber(names.length)],
                ipAddress: ipAddresses[randomNumber(ipAddresses.length)],
                actionStatus: actionStatuses[randomNumber(actionStatuses.length)],
                connectStatus: connectStatuses[randomNumber(connectStatuses.length)],
                service: 'Khám tim mạch, Khám mắt...',
            })),
        [],
    );
    return (
        <>
            <Typography.Title level={3}>Danh sách thiết bị</Typography.Title>
            <Form name='horizontal_login' layout='inline'>
                <Form.Item
                    layout='vertical'
                    label='Trạng thái hoạt động'
                    name='actionStatus'
                    initialValue='all'
                    css={styledFormItem}
                >
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='running'>Hoạt động</Select.Option>
                        <Select.Option value='stopping'>Ngưng hoạt động</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item
                    layout='vertical'
                    label='Trạng thái kết nối'
                    name='connectStatus'
                    initialValue='all'
                    css={styledFormItem}
                >
                    <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                        <Select.Option value='all'>Tất cả</Select.Option>
                        <Select.Option value='connecting'>Kết nối</Select.Option>
                        <Select.Option value='disconnect'>Mất kết nối</Select.Option>
                    </StyledSelect>
                </Form.Item>

                <Form.Item
                    layout='vertical'
                    label='Từ khoá'
                    name='searchTerm'
                    css={[styledFormItem, { marginLeft: 'auto' }]}
                >
                    <Input.Search placeholder='Nhập từ khóa' />
                </Form.Item>
            </Form>
            <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                rowHoverable={false}
                pagination={{ defaultPageSize: 9 }}
                rowKey={'id'}
                css={{
                    marginTop: 16,
                    '&.ant-table-wrapper .ant-table-row:nth-of-type(even)': {
                        backgroundColor: designToken['orange-50'],
                    },
                }}
            />

            <Link to='/monitor/add'>
                <div
                    css={{
                        position: 'absolute',
                        top: 244,
                        right: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: 80,
                        paddingBlock: 12,
                        paddingInline: 4,
                        backgroundColor: designToken['orange-50'],
                        borderRadius: '8px 0 0 8px',
                        textAlign: 'center',
                        zIndex: 1,
                    }}
                >
                    <Button
                        variant='solid'
                        aria-label='add new monitor'
                        style={{ minWidth: 28, height: 28, marginBottom: 4 }}
                    >
                        <PlusOutlined />
                    </Button>
                    <span style={{ color: designToken['orange-500'] }}>Thêm thiết bị</span>
                </div>
            </Link>
        </>
    );
}

export default MonitorPage;
