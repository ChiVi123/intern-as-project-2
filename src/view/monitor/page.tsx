import { css } from '@emotion/react';
import { Form, Input, Select, TableColumnsType, Typography } from 'antd';
import { Link, useLoaderData } from 'react-router-dom';

import { Select as StyledSelect, Table } from '~components';
import { designToken } from '~core';
import { cssFloatButtonAction, cssFloatContent, cssFloatGroupAction, cssFloatIconWrapper } from '~css-emotion';
import { AddSquareSolidIcon, ChevronDownSolidIcon } from '~icons';
import { IDeviceEntity } from '~modules/device';
import { IServiceEntity } from '~modules/service';

const columns: TableColumnsType<IDeviceEntity> = [
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
        render: (obj: { label: string; value: string }) => {
            return (
                <>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            marginRight: 4,
                            borderRadius: '100%',
                            backgroundColor: obj?.value === 'running' ? designToken.colorSuccess : '#ec3740',
                        }}
                    ></span>
                    {obj?.label}
                </>
            );
        },
    },
    {
        title: 'Trạng thái kết nối',
        dataIndex: 'connectStatus',
        key: 'connectStatus',
        render: (obj: { label: string; value: string }) => {
            return (
                <>
                    <span
                        style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            marginRight: 4,
                            borderRadius: '100%',
                            backgroundColor: obj?.value === 'connecting' ? designToken.colorSuccess : '#ec3740',
                        }}
                    ></span>
                    {obj?.label}
                </>
            );
        },
    },
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'services',
        key: 'services',
        render: (value: IServiceEntity[]) => value.map((item) => item.name).join(', '),
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
    const loader = useLoaderData() as IDeviceEntity[];

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

            <Table dataSource={loader} columns={columns} />

            <div css={cssFloatGroupAction}>
                <Link to='/monitor/add'>
                    <div css={cssFloatButtonAction}>
                        <div css={cssFloatIconWrapper}>
                            <AddSquareSolidIcon />
                        </div>
                        <span css={cssFloatContent}>Thêm thiết bị</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default MonitorPage;
