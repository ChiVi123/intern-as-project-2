import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex, Form, FormProps, Modal, ModalProps, Select, Typography } from 'antd';
import { useState } from 'react';

import { Button, Select as StyledSelect } from '~components';
import { designToken } from '~core';
import { cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';

const ModalWrapper = ({ className, ...props }: ModalProps) => <Modal {...props} rootClassName={className} />;

const StyledModal = styled(ModalWrapper)({
    '&.ant-modal-root .ant-modal-content': {
        padding: '20px 0 0',
        borderRadius: 24,
        overflow: 'hidden',
    },
});
const cssFooterContent = css({
    'div&&': { margin: 0, fontSize: 22, fontWeight: 700, textAlign: 'center', color: designToken.colorWhite },
    'div&& + div&&': { marginTop: 12 },
});

function AddQueuePage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit: FormProps['onFinish'] = (value) => {
        console.log(value);
        setIsModalOpen(true);
    };

    return (
        <>
            <Typography.Title level={3}>Quản lý cấp số</Typography.Title>
            <div css={cssPaper}>
                <Typography.Title
                    level={2}
                    css={{
                        'h2&': {
                            margin: 0,
                            fontSize: 32,
                            fontWeight: 700,
                            color: designToken['orange-500'],
                            textAlign: 'center',
                        },
                    }}
                >
                    CẤP SỐ MỚI
                </Typography.Title>

                <Typography.Title level={4} css={{ 'h4&': { fontWeight: 700, textAlign: 'center' } }}>
                    Dịch vụ khách hàng lựa chọn
                </Typography.Title>

                <Form style={{ maxWidth: 400, marginInline: 'auto' }} onFinish={handleSubmit}>
                    <Form.Item name='service' initialValue='all'>
                        <StyledSelect placeholder='Tất cả' suffixIcon={<ChevronDownSolidIcon />}>
                            <Select.Option value='all'>Tất cả</Select.Option>
                            <Select.Option value='kham-san---phu-khoa'>Khám sản - Phụ khoa</Select.Option>
                            <Select.Option value='kham-rang-ham-mat'>Khám răng hàm mặt</Select.Option>
                            <Select.Option value='kham-tai-mui-hong'>Khám tai mũi họng</Select.Option>
                        </StyledSelect>
                    </Form.Item>

                    <Form.Item style={{ marginTop: 80 }}>
                        <Flex gap={32} justify='center'>
                            <Button htmlType='button' variant='filled'>
                                Hủy bỏ
                            </Button>
                            <Button htmlType='submit'>Thêm thiết bị</Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>

            <StyledModal open={isModalOpen} mask={false} footer={null} onCancel={() => setIsModalOpen(false)}>
                <Typography.Title level={2} css={{ 'h2&&': { textAlign: 'center', marginBottom: 24 } }}>
                    Số thứ tự được cấp
                </Typography.Title>

                <Typography.Title
                    css={{
                        'h1&&': {
                            margin: 0,
                            fontSize: 56,
                            fontWeight: 800,
                            textAlign: 'center',
                            color: designToken['orange-500'],
                        },
                    }}
                >
                    2001201
                </Typography.Title>

                <Typography.Paragraph css={{ 'div&&': { marginTop: 24, textAlign: 'center' } }}>
                    DV: Khám răng hàm mặt <Typography.Text strong>(tại quầy số 1)</Typography.Text>
                </Typography.Paragraph>

                <div css={{ paddingBlock: 16, marginTop: 44, backgroundColor: designToken['orange-500'] }}>
                    <Typography.Paragraph css={cssFooterContent}>Thời gian cấp: 09:30 11/10/2021</Typography.Paragraph>
                    <Typography.Paragraph css={cssFooterContent}>Hạn sử dụng: 17:30 11/10/2021</Typography.Paragraph>
                </div>
            </StyledModal>
        </>
    );
}

export default AddQueuePage;
