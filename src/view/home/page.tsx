import { Flex, Typography } from 'antd';
import { Button } from '~components';

function HomePage() {
    return (
        <>
            <Typography.Title level={1}>HomePage</Typography.Title>
            <Flex gap={20}>
                <Button variant='filled'>Đăng xuất</Button>
                <Button variant='outlined'>Hủy bỏ</Button>
                <Button>Thêm dịch vụ</Button>
            </Flex>
        </>
    );
}

export default HomePage;
