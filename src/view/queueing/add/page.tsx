import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex, Form, FormProps, message, Modal, ModalProps, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { doc, DocumentReference, Timestamp } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button, Select as StyledSelect } from '~components';
import { firebaseStore } from '~config';
import { designToken, ResponseErrorRepo } from '~core';
import { cssPaper } from '~css-emotion';
import { ChevronDownSolidIcon } from '~icons';
import { addQueueing, getCountByServiceRef, IQueueingEntity } from '~modules/queueing';
import { IServiceEntity } from '~modules/service';
import { formatDate } from '~utils';

type DataType = {
    serviceId: string;
};

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
    const [messageApi, contextHolder] = message.useMessage();
    const loaderService = useLoaderData() as IServiceEntity[];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [queueingModal, setQueueingModal] = useState<Omit<IQueueingEntity, 'id'> & { serviceName: string }>();
    const options = useMemo(() => {
        return loaderService.map((item) => ({ label: item.name, value: item.id } as DefaultOptionType));
    }, [loaderService]);

    const handleSubmit: FormProps<DataType>['onFinish'] = async ({ serviceId }) => {
        const serviceRef = doc(firebaseStore, 'service', serviceId) as DocumentReference<IServiceEntity>;
        const queueingCountResult = await getCountByServiceRef(serviceRef);
        const service = loaderService.find((item) => item.id === serviceId);
        if (!service) {
            return;
        }
        if (queueingCountResult instanceof ResponseErrorRepo) {
            messageApi.open({ type: 'error', content: queueingCountResult.message });
            return;
        }
        const createdDate = new Date();
        const expiredDate = new Date(createdDate);
        const suffix = (queueingCountResult.data! + 1).toString().padStart(4, '0');
        expiredDate.setHours(createdDate.getHours() + 8);
        const queueing: Omit<IQueueingEntity, 'id'> = {
            guestName: 'Nguyễn Thị Dung',
            ordinalNumber: Number(service.rule.prefix + suffix),
            device: 'Kiosk',
            phoneNumber: '0948523623',
            email: 'nguyendung@gmail.com',
            status: 'Đang chờ',
            createdAt: Timestamp.fromDate(createdDate),
            expired: Timestamp.fromDate(expiredDate),
            service: serviceRef,
        };

        const resultQueueing = await addQueueing(queueing);

        if (resultQueueing instanceof ResponseErrorRepo) {
            messageApi.open({ type: 'error', content: resultQueueing.message });
            return;
        }

        if (!resultQueueing.data) {
            messageApi.open({ type: 'error', content: 'Không có dữ liệu nào được trả về' });
            return;
        }

        setQueueingModal({ ...queueing, serviceName: service.name });
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}
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
                    <Form.Item<DataType> name='serviceId'>
                        <StyledSelect
                            options={options}
                            placeholder='Chọn dịch vụ'
                            suffixIcon={<ChevronDownSolidIcon />}
                        />
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

            <StyledModal open={isModalOpen} mask={false} footer={null} onCancel={handleCancel}>
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
                    {queueingModal?.ordinalNumber}
                </Typography.Title>

                <Typography.Paragraph css={{ 'div&&': { marginTop: 24, textAlign: 'center' } }}>
                    DV: {queueingModal?.serviceName} <Typography.Text strong>(tại quầy số 1)</Typography.Text>
                </Typography.Paragraph>

                <div css={{ paddingBlock: 16, marginTop: 44, backgroundColor: designToken['orange-500'] }}>
                    <Typography.Paragraph css={cssFooterContent}>
                        Thời gian cấp: {formatDate(queueingModal?.createdAt.toDate() || new Date())}
                    </Typography.Paragraph>
                    <Typography.Paragraph css={cssFooterContent}>
                        Hạn sử dụng: {formatDate(queueingModal?.expired.toDate() || new Date())}
                    </Typography.Paragraph>
                </div>
            </StyledModal>
        </>
    );
}

export default AddQueuePage;
