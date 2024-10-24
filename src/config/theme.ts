import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
    components: {
        Layout: { siderBg: '#fff', bodyBg: '#f6f6f6' },
        Button: { paddingBlock: 12, paddingInline: 0, contentFontSize: 16, contentLineHeight: 1 },
    },
    token: {
        'orange-1': '#fff2e7',
        'orange-2': '#ffe3cd',
        'orange-4': '#ffac6a',
        'orange-5': '#ff9138',
        'orange-6': '#ff7506',
        'orange-7': '#bf5805',

        // font
        fontFamily:
            "Nunito, -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",

        colorPrimary: '#ff7506',
        // colorPrimaryBg: '#ff9138',
        colorPrimaryBgHover: '#fff2e7',
        colorPrimaryBorder: '#ffac6a',
        // blue
        colorLink: '#4277ff',
        // red
        colorError: '#e73f3f',
        // green
        colorSuccess: '#34cd26',
        colorText: '#282739',
    },
};
