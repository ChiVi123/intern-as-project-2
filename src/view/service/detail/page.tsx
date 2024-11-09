import { Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select, TableColumnsType, Typography } from 'antd';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Select as StyledSelect, Table } from '~components';
import { designToken } from '~core';
import { cssHeading, cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';
import { IServiceEntity } from '~modules/service';

interface DataType {
    id: string;
    actionStatus: string;
}

const randomNumber = (to: number) => Math.floor(Math.random() * to);
const actionStatuses = ['Đã hoàn thành', 'Đang thực hiện', 'Vắng'];

const columns: TableColumnsType<DataType> = [
    {
        title: 'Số thứ tự',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Trạng thái',
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
                            backgroundColor:
                                value === 'Đã hoàn thành'
                                    ? designToken.colorSuccess
                                    : value === 'Đang thực hiện'
                                    ? '#5490eb'
                                    : '#6c7585',
                        }}
                    ></span>
                    {value}
                </>
            );
        },
    },
];

function ServiceDetailPage() {
    const loader = useLoaderData() as IServiceEntity;
    const dataSource = useMemo(
        () =>
            Array.from<DataType>({ length: 60 }).map<DataType>((_, i) => ({
                id: '201' + i.toString().padStart(3, '0'),
                actionStatus: actionStatuses[randomNumber(actionStatuses.length)],
            })),
        [],
    );

    return (
        <>
            <Typography.Title level={3}>Quản lý dịch vụ</Typography.Title>
            <Flex gap={24}>
                <div css={cssPaper} style={{ flex: 1 }}>
                    <Typography.Title level={4} css={cssHeading} style={{ marginBottom: 12 }}>
                        Thông tin dịch vụ
                    </Typography.Title>

                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <Typography.Text strong>Mã dịch vụ: </Typography.Text>
                            <Typography.Text>{loader.id}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text strong>Tên dịch vụ: </Typography.Text>
                            <Typography.Text>{loader.name}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text strong>Mô tả: </Typography.Text>
                            <Typography.Text>{loader.description}</Typography.Text>
                        </Col>
                    </Row>

                    <Typography.Title level={4} css={cssHeading} style={{ marginTop: 16, marginBottom: 12 }}>
                        Quy tắc cấp số
                    </Typography.Title>

                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <Row>
                                <Col span={8}>
                                    <Typography.Text strong>Tăng tự động:</Typography.Text>
                                </Col>
                                <Col span={16}>
                                    <Flex align='center' gap={4}>
                                        <InputNumber
                                            defaultValue={loader.rule.autoIncrement.start}
                                            formatter={(value) => value?.toString().padStart(4, '0') || ''}
                                            style={{ flex: 1 }}
                                            onWheel={(e) => e.currentTarget.blur()}
                                        />
                                        <Typography.Text>đến</Typography.Text>
                                        <InputNumber
                                            defaultValue={loader.rule.autoIncrement.end}
                                            formatter={(value) => value?.toString().padStart(4, '0') || ''}
                                            style={{ flex: 1 }}
                                            onWheel={(e) => e.currentTarget.blur()}
                                        />
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={8}>
                                    <Typography.Text strong>Prefix: </Typography.Text>
                                </Col>
                                <Col span={16}>
                                    <Input defaultValue={loader.rule.prefix} style={{ width: 60 }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            {loader.rule.reset && (
                                <>
                                    <Typography.Text strong>Reset mỗi ngày</Typography.Text>
                                    <Typography.Paragraph>
                                        Ví dụ: {loader.rule.prefix}-{loader.rule.suffix}
                                    </Typography.Paragraph>
                                </>
                            )}
                        </Col>
                    </Row>
                </div>

                <div css={cssPaper}>
                    <Form name='inline_search' layout='inline'>
                        <Form.Item
                            layout='vertical'
                            label='Trạng thái'
                            name='actionStatus'
                            initialValue='all'
                            style={{ width: 120 }}
                        >
                            <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                                <Select.Option value='all'>Tất cả</Select.Option>
                                <Select.Option value='running'>Hoạt động</Select.Option>
                                <Select.Option value='stopping'>Ngưng hoạt động</Select.Option>
                            </StyledSelect>
                        </Form.Item>

                        <Form.Item layout='vertical' label='Chọn thời gian'>
                            <Form.Item
                                name='startDate'
                                style={{ display: 'inline-block', width: 'calc(120px - 8px)', marginRight: 8 }}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                name='endDate'
                                style={{ display: 'inline-block', width: 'calc(120px - 8px)', margin: 0 }}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            layout='vertical'
                            label='Từ khoá'
                            name='searchTerm'
                            style={{ width: 200, margin: 0, marginLeft: 'auto' }}
                        >
                            <Input.Search placeholder='Nhập từ khóa' />
                        </Form.Item>
                    </Form>

                    <Table dataSource={dataSource} columns={columns} defaultPageSize={8} />
                </div>
            </Flex>
        </>
    );
}

export default ServiceDetailPage;
