import { Col, Row, Typography } from 'antd';
import { useLoaderData } from 'react-router-dom';
import { cssHeading, cssPaper } from '~css-emotion';
import { IDeviceEntity } from '~modules/device';

function MonitorPage() {
    const loader = useLoaderData() as IDeviceEntity;

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
                        <Typography.Text>{loader.id}</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Loại thiết bị: </Typography.Text>
                        <Typography.Text>{typeof loader.type !== 'object' && loader.type}</Typography.Text>
                    </Col>

                    <Col span={12}>
                        <Typography.Text strong>Tên thiết bị: </Typography.Text>
                        <Typography.Text>{loader.name}</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Tên đăng nhập: </Typography.Text>
                        <Typography.Text>{loader.usernameDevice}</Typography.Text>
                    </Col>

                    <Col span={12}>
                        <Typography.Text strong>Địa chỉ IP: </Typography.Text>
                        <Typography.Text>{loader.ipAddress}</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text strong>Mật khẩu: </Typography.Text>
                        <Typography.Text>{loader.passwordDevice}</Typography.Text>
                    </Col>

                    <Col>
                        <Typography.Text strong>Dịch vụ sử dụng:</Typography.Text>
                        <Typography.Paragraph>
                            {loader.services?.map((item) => item.name).join(', ')}
                        </Typography.Paragraph>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MonitorPage;
