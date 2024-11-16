import { Area, RadialBar, Tooltip } from '@ant-design/plots';
import { Calendar, CalendarProps, Card, Flex, Form, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { Select } from '~components';
import { designToken } from '~core';
import {
    BookmarkStarIcon,
    CalendarCheckedOutlinedIcon,
    CalendarEmptyOutlinedIcon,
    ChevronDownSolidIcon,
    LayerGroupOutlinedIcon,
    MessageOutlinedIcon,
    MonitorOutlinedIcon,
    UserCallIcon,
} from '~icons';
import {
    CalendarHeader,
    CardStatistics,
    StyledDot,
    StyledPaper,
    StyledRadialText,
    StyledRadialWrapper,
    StyledTextLarge,
    StyledTextSmall,
    StyledTextSmallBold,
} from './components';

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
    { name: 'stopping', count: 422 },
    { name: 'running', count: 3779 },
];
const dataRadial2 = [
    { name: 'running', count: 66 },
    { name: 'stopping', count: 210 },
];
const dataRadial3 = [
    { name: 'canceled', count: 32 },
    { name: 'waiting', count: 486 },
    { name: 'used', count: 3721 },
];

function DashboardPage() {
    const handlePanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <Flex gap={8}>
            <div style={{ width: 'calc(100% - 360px)', marginTop: 88 }}>
                <Typography.Title level={3} style={{ marginBottom: 16, color: designToken['orange-500'] }}>
                    Biểu đồ cấp số
                </Typography.Title>
                <Flex style={{ marginBottom: 16, marginInline: -4 }}>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            content='32,41%'
                            bg='#6695FB26'
                            iconColor='#6695FB'
                            tagColor='#FF950126'
                            icon={<CalendarEmptyOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            content='32,41%'
                            down
                            bg='#35C75A26'
                            iconColor='#35C75A'
                            tagColor='#E73F3F26'
                            icon={<CalendarCheckedOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            content='56,41%'
                            bg='#FFAC6A26'
                            iconColor='#FFAC6A'
                            tagColor='#FF950126'
                            icon={<UserCallIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            content='22,41%'
                            down
                            bg='#F86D6D26'
                            iconColor='#F86D6D'
                            tagColor='#E73F3F26'
                            icon={<BookmarkStarIcon />}
                        />
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
                                yField='count'
                                radius={1}
                                innerRadius={0.6}
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

                        <div style={{ minWidth: 168, marginLeft: 'auto' }}>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color='#ffd130' />
                                    <span>Đang hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={designToken['orange-500']} style={{ minWidth: 40 }}>
                                    3.799
                                </StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color={designToken['gray-300']} />
                                    <span>Ngưng hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={designToken['orange-500']} style={{ minWidth: 40 }}>
                                    422
                                </StyledTextSmallBold>
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
                                yField='count'
                                radius={1}
                                innerRadius={0.6}
                                legend={false}
                                axis={{ x: false, y: false }}
                                tooltip={{ items: [''] }}
                                scale={{ y: { domain: [0, 276] } }}
                                markBackground={{ opacity: 0.25 }}
                                sizeField={10}
                                style={{
                                    radius: 180,
                                    fill: (_: unknown, index: number) => {
                                        return index === 0 ? designToken['gray-300'] : '#4277FF';
                                    },
                                }}
                            />
                            <StyledRadialText>76%</StyledRadialText>
                        </StyledRadialWrapper>

                        <div style={{ marginLeft: 12 }}>
                            <StyledTextLarge>276</StyledTextLarge>

                            <Flex gap={4} style={{ color: '#4277FF' }}>
                                <MessageOutlinedIcon size={14} />
                                <StyledTextSmall>Dịch vụ</StyledTextSmall>
                            </Flex>
                        </div>

                        <div style={{ minWidth: 168, marginLeft: 'auto' }}>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color='#4277FF' />
                                    <span>Đang hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={'#4277FF'} style={{ minWidth: 40 }}>
                                    210
                                </StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color={designToken['gray-300']} />
                                    <span>Ngưng hoạt động</span>
                                </Flex>
                                <StyledTextSmallBold color={'#4277FF'} style={{ minWidth: 40 }}>
                                    66
                                </StyledTextSmallBold>
                            </Flex>
                        </div>
                    </Flex>
                </StyledPaper>

                {/* Item 3 */}
                <StyledPaper>
                    <Flex align='center'>
                        <StyledRadialWrapper>
                            <RadialBar
                                data={dataRadial3}
                                xField='name'
                                yField='count'
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

                        <div style={{ minWidth: 168, marginLeft: 'auto' }}>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color='#35c75a' />
                                    <span>Đã sử dụng</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a' style={{ minWidth: 40 }}>
                                    3.721
                                </StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color={designToken['gray-300']} />
                                    <span>Đang chờ</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a' style={{ minWidth: 40 }}>
                                    486
                                </StyledTextSmallBold>
                            </Flex>
                            <Flex align='center' justify='space-between'>
                                <Flex align='center' gap={4}>
                                    <StyledDot color='#f178b6' />
                                    <span>Bỏ qua</span>
                                </Flex>
                                <StyledTextSmallBold color='#35c75a' style={{ minWidth: 40 }}>
                                    32
                                </StyledTextSmallBold>
                            </Flex>
                        </div>
                    </Flex>
                </StyledPaper>

                <StyledPaper>
                    <Calendar fullscreen={false} headerRender={CalendarHeader} onPanelChange={handlePanelChange} />
                </StyledPaper>
            </StyledPaper>
        </Flex>
    );
}
export default DashboardPage;
