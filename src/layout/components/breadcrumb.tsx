import styled from '@emotion/styled';
import { Breadcrumb as BreadcrumbAntD, BreadcrumbProps } from 'antd';
import { designToken } from '~core';

const BreadcrumbWrapper = ({ className, ...props }: BreadcrumbProps) => (
    <BreadcrumbAntD rootClassName={className} {...props} />
);
const StyledBreadcrumb = styled(BreadcrumbWrapper)({
    '&& > ol': {
        alignItems: 'center',
    },
    '&& li:not(.ant-breadcrumb-separator)': {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'inherit',
        a: {
            height: '100%',
        },
    },
    '&& li:last-of-type': {
        color: designToken['orange-500'],
    },
    '&& .ant-breadcrumb-separator': {
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        '& svg': {
            color: 'inherit',
        },
    },
});

export default StyledBreadcrumb;
