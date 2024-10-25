import { theme } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';
import { themeConfig } from '~config';

interface IAliasToken extends AliasToken {
    'orange-50': string;
    'orange-100': string;
    'orange-200': string;
    'orange-300': string;
    'orange-400': string;
    'orange-500': string;
    'orange-600': string;
    'orange-700': string;
    'orange-800': string;
    'orange-900': string;

    'gray-50': string;
    'gray-100': string;
    'gray-200': string;
    'gray-300': string;
    'gray-400': string;
    'gray-500': string;
    'gray-600': string;
    'gray-700': string;
    'gray-800': string;
    'gray-900': string;
}

export const designToken: IAliasToken = {
    ...theme.getDesignToken(themeConfig),
    'orange-50': '#fff2e7',
    'orange-100': '#ffe3cd',
    'orange-200': '#ffac6a',
    'orange-300': '#',
    'orange-400': '#ff9138',
    'orange-500': '#ff7506',
    'orange-600': '#bf5805',
    'orange-700': '#',
    'orange-800': '#',
    'orange-900': '#',

    'gray-50': '#',
    'gray-100': '#',
    'gray-200': '#a9a9b0',
    'gray-300': '#7e7d88',
    'gray-400': '#',
    'gray-500': '#',
    'gray-600': '#',
    'gray-700': '#',
    'gray-800': '#',
    'gray-900': '#',
};
