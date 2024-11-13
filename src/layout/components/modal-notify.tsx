import styled from '@emotion/styled';
import { Popover, PopoverProps } from 'antd';
import { designToken } from '~core';

const ModalNotify = ({ className, ...props }: PopoverProps) => (
    <Popover arrow={false} rootClassName={className} {...props} />
);
const StyledModalNotify = styled(ModalNotify)({
    '& .ant-popover-inner': {
        padding: 0,
        borderRadius: 10,
        overflow: 'hidden',
    },
    '& .ant-popover-title, & .ant-popover-inner-content': {
        paddingInline: 24,
    },
    '& .ant-popover-title': {
        paddingBlock: 10,
        paddingInline: 24,
        margin: 0,
        backgroundColor: designToken['orange-400'],
        color: 'white',
    },
    '& .ant-popover-inner-content': {
        maxHeight: 360,
        paddingInline: 24,
        overflowY: 'auto',

        '::-webkit-scrollbar': {
            width: 4,
        },
        '::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
            background: designToken['orange-200'],
            borderRadius: 2,
        },
    },
});

export default StyledModalNotify;
