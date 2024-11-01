import { DatePicker, Form, Input, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { designToken } from '~core';
import { cssWidthInputFormSearch } from '~css-emotion';

interface DataType {
    id: string;
    username: string;
    createdAt: string;
    ipAddress: string;
    actionSummary: string;
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
const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Thời gian tác động',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'IP thực hiện',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
    },
    {
        title: 'Thao tác thực hiện',
        dataIndex: 'actionSummary',
        key: 'actionSummary',
    },
];

function UserLoggingPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: i.toString(),
                username: 'tuyetnguyen@1' + i,
                createdAt: formatDate(),
                ipAddress: ipAddresses[randomNumber(ipAddresses.length)],
                actionSummary: 'Cập nhật thông tin dịch vụ DV_01',
            })),
        [],
    );
    return (
        <>
            <Form name='horizontal_login' layout='inline'>
                <Form.Item layout='vertical' label='Chọn thời gian'>
                    <Form.Item
                        name='startDate'
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 8 }}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name='endDate' style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: 0 }}>
                        <DatePicker />
                    </Form.Item>
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
        </>
    );
}

export default UserLoggingPage;
