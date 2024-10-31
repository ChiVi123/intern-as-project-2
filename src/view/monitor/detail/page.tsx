import { Col, Row, Typography } from 'antd';
import { cssHeading, cssPaper } from '~css-emotion';

function MonitorPage() {
    return (
        <>
            <Typography.Title level={3}>Quản lý thiết bị</Typography.Title>
            <div css={cssPaper}>
                <Typography.Title level={4} css={cssHeading}>
                    Thông tin thiết bị
                </Typography.Title>

                <Row gutter={[0, 16]}>
                    <Col span={12}>
                        <Typography.Text strong>Mã thiết bị: </Typography.Text>
                        <Typography.Text>KIO_01</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Loại thiết bị: </Typography.Text>
                        <Typography.Text>Kiosk</Typography.Text>
                    </Col>

                    <Col span={12}>
                        <Typography.Text strong>Tên thiết bị: </Typography.Text>
                        <Typography.Text>Kiosk</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Tên đăng nhập: </Typography.Text>
                        <Typography.Text>Linhkyo011</Typography.Text>
                    </Col>

                    <Col span={12}>
                        <Typography.Text strong>Địa chỉ IP: </Typography.Text>
                        <Typography.Text>128.172.308</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Mật khẩu: </Typography.Text>
                        <Typography.Text>CMS</Typography.Text>
                    </Col>

                    <Col>
                        <Typography.Text strong>Dịch vụ sử dụng:</Typography.Text>
                        <Typography.Paragraph>
                            Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám
                            tổng quát.
                        </Typography.Paragraph>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MonitorPage;
