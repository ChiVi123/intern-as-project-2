import { ArrowDownOutlined } from '@ant-design/icons';
import { Area, RadialBar, Tooltip } from '@ant-design/plots';
import styled from '@emotion/styled';
import { Card, Flex, Form, Tag, Typography } from 'antd';
import { Select } from '~components';
import { designToken } from '~core';
import { ChevronDownSolidIcon, LayerGroupOutlinedIcon, MonitorOutlinedIcon } from '~icons';

declare global {
    interface Date {
        addDays: (value: number) => Date;
    }
}

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const startDate = new Date(2024, 9, 1);

const value = [
    {
        date: startDate.addDays(1 - 1),
        count: 2800,
    },
    {
        date: startDate.addDays(2 - 1),
        count: 2900,
    },
    {
        date: startDate.addDays(3 - 1),
        count: 3200,
    },
    {
        date: startDate.addDays(4 - 1),
        count: 3250,
    },
    {
        date: startDate.addDays(5 - 1),
        count: 3280,
    },
    {
        date: startDate.addDays(6 - 1),
        count: 3400,
    },
    {
        date: startDate.addDays(7 - 1),
        count: 3420,
    },
    {
        date: startDate.addDays(8 - 1),
        count: 3460,
    },
    {
        date: startDate.addDays(9 - 1),
        count: 3520,
    },
    {
        date: startDate.addDays(10 - 1),
        count: 3600,
    },
    {
        date: startDate.addDays(11 - 1),
        count: 3680,
    },
    {
        date: startDate.addDays(12 - 1),
        count: 3700,
    },
    {
        date: startDate.addDays(13 - 1),
        count: 3750,
    },
    {
        date: startDate.addDays(14 - 1),
        count: 3800,
    },
    {
        date: startDate.addDays(15 - 1),
        count: 3900,
    },
    {
        date: startDate.addDays(16 - 1),
        count: 3900,
    },
    {
        date: startDate.addDays(17 - 1),
        count: 4000,
    },
    {
        date: startDate.addDays(18 - 1),
        count: 4200,
    },
    {
        date: startDate.addDays(19 - 1),
        count: 3800,
    },
    {
        date: startDate.addDays(20 - 1),
        count: 3780,
    },
    {
        date: startDate.addDays(21 - 1),
        count: 3720,
    },
    {
        date: startDate.addDays(22 - 1),
        count: 3600,
    },
    {
        date: startDate.addDays(23 - 1),
        count: 3200,
    },
    {
        date: startDate.addDays(24 - 1),
        count: 3400,
    },
    {
        date: startDate.addDays(25 - 1),
        count: 3420,
    },
    {
        date: startDate.addDays(26 - 1),
        count: 3460,
    },
    {
        date: startDate.addDays(27 - 1),
        count: 3466,
    },
    {
        date: startDate.addDays(28 - 1),
        count: 3200,
    },
    {
        date: startDate.addDays(29 - 1),
        count: 3122,
    },
    {
        date: startDate.addDays(30 - 1),
        count: 3320,
    },
    {
        date: startDate.addDays(31 - 1),
        count: 3300,
    },
];
const dataRadial1 = [
    { name: 'running', star: 422 },
    { name: 'stopping', star: 3779 },
];
const dataRadial2 = [
    { name: 'canceled', star: 32 },
    { name: 'waiting', star: 486 },
    { name: 'used', star: 3721 },
];

const StyledRadialWrapper = styled.div({
    position: 'relative',
    width: 90,
    height: 90,
    margin: -20,
});
const StyledRadialText = styled.div({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});
const StyledPaper = styled.div({
    paddingBlock: 8,
    paddingInline: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    boxShadow: '2px 2px 15px 0px #4640431A',
});
const StyledCircle = styled.div({
    width: 40,
    height: 40,
    borderRadius: '100%',
    backgroundColor: '#35c75a',
});
const StyledTextLarge = styled.div({
    fontSize: '1.1rem',
    fontWeight: 700,
    lineHeight: 1.5,
    color: designToken['gray-400'],
});
const StyledTextSmall = styled.div({
    fontSize: '0.9rem',
    fontWeight: 600,
    lineHeight: 1.5,
    color: 'inherit',
});
const StyledTextSmallBold = styled.div<{ color: string }>((props) => ({
    fontSize: '0.9rem',
    fontWeight: 700,
    lineHeight: 1.3,
    color: props.color,
}));
const StyledDot = styled.span<{ color: string }>((props) => ({
    display: 'inline-block',
    width: 4,
    height: 4,
    backgroundColor: props.color,
    borderRadius: '100%',
}));
const StyledTag = styled(Tag)({ '&&': { borderRadius: 999, color: designToken['orange-400'] } });

const CardStatistics = () => (
    <StyledPaper>
        <Flex align='center' gap={12}>
            <StyledCircle />

            <StyledTextSmallBold color={designToken['gray-400']}>Số thứ tự đã cấp</StyledTextSmallBold>
        </Flex>
        <Flex align='center' justify='space-between' style={{ marginTop: 12 }}>
            <StyledTextLarge>4.221</StyledTextLarge>
            <StyledTag color='#FF950126' bordered={false} icon={<ArrowDownOutlined />}>
                32,41%
            </StyledTag>
        </Flex>
    </StyledPaper>
);

function DashboardPage() {
    return (
        <Flex gap={8}>
            <div style={{ width: 'calc(100% - 360px)', marginTop: 88 }}>
                <Typography.Title level={3} style={{ marginBottom: 16, color: designToken['orange-500'] }}>
                    Biểu đồ cấp số
                </Typography.Title>
                <Flex style={{ marginBottom: 16, marginInline: -6 }}>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 6 }}>
                        <CardStatistics />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 6 }}>
                        <CardStatistics />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 6 }}>
                        <CardStatistics />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 6 }}>
                        <CardStatistics />
                    </div>
                </Flex>

                <Card>
                    <Flex align='center' justify='space-between' style={{ marginBottom: 12 }}>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            Bảng thống kê theo ngày
                        </Typography.Title>
                        <Form.Item label='Xem theo' style={{ margin: 0 }}>
                            <Select
                                placeholder='Chọn để xem'
                                options={[
                                    { label: 'Ngày', value: 'day' },
                                    { label: 'Tuần', value: 'week' },
                                    { label: 'Tháng', value: 'month' },
                                ]}
                                suffixIcon={<ChevronDownSolidIcon />}
                            />
                        </Form.Item>
                    </Flex>
                    <Area
                        data={{ type: 'inline', value }}
                        xField={(d: { date: Date }) => d.date.getDate()}
                        yField='count'
                        shapeField='smooth'
                        tooltip={{ title: false } as Tooltip}
                        axis={{ x: { title: 'Sl/ngay' } }}
                        style={{
                            fill: 'linear-gradient(90deg, #ceddff 0%, rgba(206, 221, 255, 0) 100%)',
                            lineWidth: 1,
                        }}
                    />
                </Card>
            </div>

            <StyledPaper style={{ flex: '0 auto', width: 360, paddingTop: 108 }}>
                <Typography.Title level={3} style={{ margin: '0 0 16px ', color: designToken['orange-500'] }}>
                    Tổng quan
                </Typography.Title>

                {/* Item 1 */}
                <StyledPaper>
                    <Flex align='center'>
                        <StyledRadialWrapper>
                            <RadialBar
                                data={dataRadial1}
                                xField='name'
                                yField='star'
                                radius={1}
                                innerRadius={0.4}
                                legend={false}
                                axis={{ x: false, y: false }}
                                tooltip={{ items: [''] }}
                                scale={{ y: { domain: [0, 4221] } }}
                                markBackground={{ opacity: 0.25 }}
                                sizeField={10}
                                style={{
                                    radius: 180,
                                    fill: (_: unknown, index: number) => {
                                        return index === 0 ? designToken['gray-300'] : designToken['orange-500'];
                                    },
                                }}
                            />
                            <StyledRadialText>90%</StyledRadialText>
                        </StyledRadialWrapper>

                        <div style={{ marginLeft: 12 }}>
                            <StyledTextLarge>4.221</StyledTextLarge>

                            <Flex gap={4} style={{ color: designToken['orange-500'] }}>
                                <MonitorOutlinedIcon size={14} />
                                <StyledTextSmall>Thiết bị</StyledTextSmall>
                            </Flex>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <Flex align='center' gap={4}>
                                <Flex align='center' gap={4} style={{ minWidth: 118 }}>
                                    <StyledDot color='#ffd130' />
                                    <span>Đang hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={designToken['orange-500']}>3.799</StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' gap={4}>
                                <Flex align='center' gap={4} style={{ minWidth: 118 }}>
                                    <StyledDot color={designToken['gray-300']} />
                                    <span>Ngưng hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={designToken['orange-500']}>422</StyledTextSmallBold>
                            </Flex>
                        </div>
                    </Flex>
                </StyledPaper>

                {/* Item 2 */}
                <StyledPaper>
                    <Flex align='center'>
                        <StyledRadialWrapper>
                            <RadialBar
                                data={dataRadial2}
                                xField='name'
                                yField='star'
                                radius={1}
                                innerRadius={0.4}
                                legend={false}
                                axis={{ x: false, y: false }}
                                tooltip={{ items: [''] }}
                                scale={{ y: { domain: [0, 4221] } }}
                                markBackground={{ opacity: 0.25 }}
                                sizeField={10}
                                style={{
                                    radius: 180,
                                    fill: (_: unknown, index: number) => {
                                        return index === 0
                                            ? '#f178b6'
                                            : index === 1
                                            ? designToken['gray-300']
                                            : '#35c75a';
                                    },
                                }}
                            />
                            <StyledRadialText>86%</StyledRadialText>
                        </StyledRadialWrapper>

                        <div style={{ marginLeft: 12 }}>
                            <StyledTextLarge>4.221</StyledTextLarge>

                            <Flex gap={4} style={{ color: '#35c75a' }}>
                                <LayerGroupOutlinedIcon size={14} />
                                <StyledTextSmall>Cấp số</StyledTextSmall>
                            </Flex>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <Flex align='center' gap={4}>
                                <Flex align='center' gap={4} style={{ minWidth: 118 }}>
                                    <StyledDot color='#35c75a' />
                                    <span>Đã sử dụng</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a'>3.721</StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' gap={4}>
                                <Flex align='center' gap={4} style={{ minWidth: 118 }}>
                                    <StyledDot color={designToken['gray-300']} />
                                    <span>Đang chờ</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a'>486</StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' gap={4}>
                                <Flex align='center' gap={4} style={{ minWidth: 118 }}>
                                    <StyledDot color='#f178b6' />
                                    <span>Bỏ qua</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a'>32</StyledTextSmallBold>
                            </Flex>
                        </div>
                    </Flex>
                </StyledPaper>
            </StyledPaper>
        </Flex>
    );
}
export default DashboardPage;
