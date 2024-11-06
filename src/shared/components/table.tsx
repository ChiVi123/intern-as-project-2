import { PaginationProps, Table as TableAntD, TableColumnsType } from 'antd';

import { designToken } from '~core';
import { ChevronDownSolidIcon } from '~icons';

interface ITableProps<T> {
    columns: TableColumnsType<T>;
    dataSource: T[];
    defaultPageSize?: number;
}

function Table<T>({ columns, dataSource, defaultPageSize = 9 }: ITableProps<T>) {
    const itemRender: PaginationProps['itemRender'] = (_, type, element) => {
        switch (type) {
            case 'prev':
                return (
                    <ChevronDownSolidIcon
                        style={{ marginTop: 4, fontSize: '1.5rem', color: designToken['gray-200'], rotate: '90deg' }}
                    />
                );
            case 'next':
                return (
                    <ChevronDownSolidIcon
                        style={{ marginTop: 4, fontSize: '1.5rem', color: designToken['gray-200'], rotate: '-90deg' }}
                    />
                );

            default:
                return element;
        }
    };

    return (
        <TableAntD
            columns={columns}
            dataSource={dataSource}
            bordered
            rowHoverable={false}
            pagination={{ defaultPageSize, showSizeChanger: false, itemRender }}
            rowKey='id'
            css={{
                marginTop: 16,
                '&.ant-table-wrapper .ant-table-row:nth-of-type(even)': {
                    backgroundColor: designToken['orange-50'],
                },
            }}
        />
    );
}

export default Table;
