import { Interpolation, Theme } from '@emotion/react';
import { Button as ButtonAntd, ButtonProps } from 'antd';
import { forwardRef } from 'react';
import { designToken } from '~core';

interface IButtonProps extends ButtonProps {
    cssExpand?: Interpolation<Theme> | Interpolation<Theme>[];
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(({ cssExpand, ...props }, ref) => (
    <ButtonAntd
        ref={ref}
        variant='solid'
        color='primary'
        css={[
            {
                minWidth: 148,
                height: 48,
                '&.ant-btn-color-primary.ant-btn-variant-filled:not(:disabled):not(.ant-btn-disabled):hover': {
                    backgroundColor: designToken['orange-2'],
                },
                '&.ant-btn-color-primary.ant-btn-variant-outlined': {
                    backgroundColor: designToken['orange-1'],
                },
            },
            cssExpand,
        ]}
        {...props}
    />
));

export default Button;
