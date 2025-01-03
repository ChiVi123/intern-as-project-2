import styled from '@emotion/styled';
import { Select } from 'antd';
import { designToken } from '~core';

const StyledSelect = styled(Select)({
    '&.ant-select.ant-select-outlined .ant-select-arrow': {
        fontSize: 24,
        color: designToken['orange-500'],
    },
    [`&.ant-select.ant-select-outlined .ant-select-selection-placeholder,
    &.ant-select.ant-select-outlined .ant-select-selection-item`]: {
        paddingInlineEnd: 28,
    },
});

export default StyledSelect;
