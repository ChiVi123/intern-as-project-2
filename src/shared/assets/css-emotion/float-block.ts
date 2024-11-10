import { css } from '@emotion/react';
import { designToken } from '~core';

export const cssFloatGroupAction = css({
    position: 'absolute',
    top: 244,
    right: 0,
    borderRadius: '8px 0 0 8px',
    zIndex: 1,
});
export const cssFloatButtonAction = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 80,
    paddingBlock: 12,
    paddingInline: 4,
    backgroundColor: designToken['orange-50'],
    textAlign: 'center',
});
export const cssFloatIconWrapper = css({
    marginBottom: 4,
    color: designToken['orange-500'],
    fontSize: '1.75rem',
});
export const cssFloatSeparate = css({
    paddingInline: 4,
    '::before': {
        content: '""',
        display: 'block',
        height: 1,
        backgroundColor: designToken['orange-100'],
        borderRadius: 0.5,
    },
});
export const cssFloatContent = css({ fontWeight: 600, color: designToken['orange-500'] });
