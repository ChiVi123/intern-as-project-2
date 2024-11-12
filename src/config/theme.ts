import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
    components: {
        Button: { paddingBlock: 12, paddingInline: 0, contentFontSize: 16, contentLineHeight: 1 },
        Layout: { siderBg: '#fff', bodyBg: '#f6f6f6' },
        Table: {
            headerColor: '#fff',
            headerBg: '#ff9138',
        },
        Tag: {
            defaultBg: '#ff7506',
            defaultColor: '#fff',
        },
        Breadcrumb: {
            iconFontSize: 20,
            separatorColor: '#7E7D88',
        },
    },
    token: {
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
        // colorTextHeading: '#ff7506',
    },
};
