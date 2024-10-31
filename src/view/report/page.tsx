import { DatePicker, Form, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { designToken } from '~core';

interface DataType {
    id: string;
    serviceName: string;
    createdAt: string;
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
const services = [
    'Khám tim mạch',
    'Khám sản - Phụ Khoa',
    'Khám răng hàm mặt',
    'Khám tai mũi họng',
    'Khám hô hấp',
    'Khám tổng quát  ',
];
const statuses = ['Đang chờ', 'Đã sử dụng', 'Bỏ qua'];
const devices = ['Kiosk', 'Hệ thống'];

const columns: TableColumnsType<DataType> = [
    {
        title: 'Số thứ tự',
        dataIndex: 'id',
        key: 'id',
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
        title: 'Tình trạng',
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

function ReportPage() {
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 80 }).map<DataType>((_, i) => ({
                id: '201' + i.toString().padStart(3, '0'),
                status: statuses[randomNumber(statuses.length)],
                device: devices[randomNumber(devices.length)],
                createdAt: formatDate(),
                serviceName: services[randomNumber(services.length)],
            })),
        [],
    );
    return (
        <>
            <Form name='inline_search' layout='inline'>
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
            </Form>

            <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                rowHoverable={false}
                pagination={{ defaultPageSize: 10 }}
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

export default ReportPage;
