import { designToken } from '~core';

function NotifyItem() {
    return (
        <div
            css={{
                paddingTop: 16,
                paddingBottom: 12,
                borderTop: '1.5px solid #d4d4d799',
            }}
        >
            <div
                css={{
                    fontWeight: 700,
                    color: designToken['orange-600'],
                }}
            >
                Người dùng: Nguyễn Thị Thùy Dung
            </div>
            <div
                css={{
                    color: designToken['gray-400'],
                }}
            >
                Thời gian nhận số: 12h20 ngày 30/11/2021
            </div>
        </div>
    );
}
export default NotifyItem;
