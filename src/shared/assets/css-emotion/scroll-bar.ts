import { css } from '@emotion/react';
import { designToken } from '~core';

export const cssScrollbar = css({
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
});
