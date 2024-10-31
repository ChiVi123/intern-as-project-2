import { MoreOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import { useMemo } from 'react';
import { Link, useMatches } from 'react-router-dom';
import { designToken } from '~core';
import {
    FileChartOutlinedIcon,
    GridLayoutOutlinedIcon,
    HexagonDotCenterIcon,
    LayerGroupOutlinedIcon,
    MessageOutlinedIcon,
    MonitorOutlinedIcon,
} from '~icons';

type MenuItem = Required<MenuProps>['items'][number];

const MenuComponent = ({ className, ...props }: MenuProps) => <Menu rootClassName={className} {...props} />;

const StyledMenu = styled(MenuComponent)({
    '&.ant-menu.ant-menu-root.ant-menu-vertical > .ant-menu-item, &.ant-menu.ant-menu-root.ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title':
        {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            paddingBlock: 12,
            marginBlock: 8,
            marginInline: 0,
            borderRadius: 0,
            lineHeight: 1,
        },
    '&.ant-menu.ant-menu-root.ant-menu-vertical .ant-menu-submenu-expand-icon': {
        insetInlineEnd: 8,
    },
    '&.ant-menu.ant-menu-root.ant-menu-vertical .ant-menu-submenu-selected .ant-menu-submenu-title': {
        backgroundColor: designToken['orange-500'],
    },
    '&.ant-menu.ant-menu-root.ant-menu-vertical .ant-menu-submenu-active .ant-menu-submenu-title': {
        backgroundColor: designToken['orange-50'],
        color: designToken['orange-500'],
    },

    '&.ant-menu-submenu.ant-menu-submenu-popup': {
        paddingInlineStart: 0,

        '.ant-menu-vertical.ant-menu-sub': {
            borderRadius: '0 12px 12px 0',
        },
    },
    '&.ant-menu-submenu.ant-menu-submenu-popup .ant-menu-item': {
        width: 'auto',
        height: 'auto',
        paddingBlock: 12,
        margin: 0,
        borderRadius: 0,
        lineHeight: 1,
    },
});

function Navigate() {
    const [, matcher] = useMatches();

    const items = useMemo<MenuItem[]>(
        () => [
            {
                key: '/dashboard',
                icon: <GridLayoutOutlinedIcon />,
                label: <Link to='/dashboard'>Dashboard</Link>,
            },
            {
                key: '/monitor',
                icon: <MonitorOutlinedIcon />,
                label: <Link to='/monitor'>Thiết bị</Link>,
            },
            {
                key: '/service',
                icon: <MessageOutlinedIcon />,
                label: <Link to='/service'>Dịch vụ</Link>,
            },
            {
                key: '/queueing',
                icon: <LayerGroupOutlinedIcon />,
                label: 'Cấp số',
            },
            {
                key: '/report',
                icon: <FileChartOutlinedIcon />,
                label: 'Báo cáo',
            },
            {
                key: '/setting',
                icon: <HexagonDotCenterIcon />,
                label: 'Cài đặt hệ thống',
                children: [
                    {
                        key: '/setting/role-management',
                        label: <Link to='/setting/role-management'>Quản lý vai trò</Link>,
                    },
                    {
                        key: '/setting/user-management',
                        label: <Link to='/setting/user-management'>Quản lý tài khoản</Link>,
                    },
                    {
                        key: '/setting/user-logging',
                        label: <Link to='/setting/user-logging'>Nhật ký người dùng</Link>,
                    },
                ],
            },
        ],
        [],
    );

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemHoverBg: designToken['orange-50'],
                        itemSelectedBg: designToken['orange-500'],

                        fontSize: 16,
                        iconSize: 20,
                        itemHeight: 24,

                        itemColor: designToken['gray-300'],
                        itemHoverColor: designToken['orange-500'],
                        itemSelectedColor: '#fff',
                    },
                },
            }}
        >
            <StyledMenu selectedKeys={[matcher.pathname]} items={items} expandIcon={<MoreOutlined />} />
        </ConfigProvider>
    );
}

export default Navigate;
