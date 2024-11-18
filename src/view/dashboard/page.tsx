import { Area, RadialBar, Tooltip } from '@ant-design/plots';
import { Calendar, CalendarProps, Card, Flex, Form, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { ElementType } from 'react';
import { useLoaderData } from 'react-router-dom';
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

type AreaValue = { date: Timestamp; count: number };
type RadialValue = {
    name: string;
    label: string;
    count: number;
    radialColor: string;
    radialTextColor: string;
    group: string;
    groupName: string;
    priority: number;
};

const fills: Record<string, (data: unknown, index: number) => string> = {
    device: (_: unknown, index: number) => {
        return index === 0 ? designToken['gray-300'] : designToken['orange-500'];
    },
    service: (_: unknown, index: number) => {
        return index === 0 ? designToken['gray-300'] : '#4277FF';
    },
    queueing: (_: unknown, index: number) => {
        return index === 0 ? '#f178b6' : index === 1 ? designToken['gray-300'] : '#35c75a';
    },
};

function DashboardPage() {
    const loader = useLoaderData() as { area: AreaValue[]; radials: RadialValue[][] };

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
                            total='4.221'
                            content='Số thứ tự đã cấp'
                            value='32,41%'
                            bg='#6695FB26'
                            iconColor='#6695FB'
                            tagColor='#FF950126'
                            icon={<CalendarEmptyOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total='3.721'
                            content='Số thứ tự đã sử dụng'
                            value='32,41%'
                            down
                            bg='#35C75A26'
                            iconColor='#35C75A'
                            tagColor='#E73F3F26'
                            icon={<CalendarCheckedOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total='486'
                            content='Số thứ tự đang chờ'
                            value='56,41%'
                            bg='#FFAC6A26'
                            iconColor='#FFAC6A'
                            tagColor='#FF950126'
                            icon={<UserCallIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total='32'
                            content='Số thứ tự đã bỏ qua'
                            value='22,41%'
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
                        data={{ type: 'inline', value: loader.area }}
                        xField={(d: { date: Timestamp }) => d.date.toDate().getDate()}
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

                {loader.radials.map((radial, radialIndex) => {
                    const total = radial.reduce((prev, curr) => prev + curr.count, 0);
                    const data = [...radial].sort((a, b) => b.priority - a.priority);
                    const radialItem = radial[0];

                    let Icon: ElementType;

                    switch (radialItem.group) {
                        case 'service':
                            Icon = MessageOutlinedIcon;
                            break;
                        case 'queueing':
                            Icon = LayerGroupOutlinedIcon;
                            break;
                        case 'device':
                        default:
                            Icon = MonitorOutlinedIcon;
                            break;
                    }

                    return (
                        <StyledPaper key={radialIndex}>
                            <Flex align='center'>
                                <StyledRadialWrapper>
                                    <RadialBar
                                        data={data}
                                        xField='name'
                                        yField='count'
                                        radius={1}
                                        innerRadius={0.6}
                                        legend={false}
                                        axis={{ x: false, y: false }}
                                        tooltip={{ items: [''] }}
                                        scale={{ y: { domain: [0, total] } }}
                                        markBackground={{ opacity: 0.25 }}
                                        sizeField={10}
                                        style={{
                                            radius: 180,
                                            fill: fills[radialItem.group],
                                        }}
                                    />
                                    <StyledRadialText>{Math.round((radialItem.count / total) * 100)}%</StyledRadialText>
                                </StyledRadialWrapper>

                                <div style={{ marginLeft: 12 }}>
                                    <StyledTextLarge>{total}</StyledTextLarge>

                                    <Flex gap={4} style={{ color: radialItem.radialTextColor }}>
                                        <Icon size={14} />
                                        <StyledTextSmall>{radialItem.groupName}</StyledTextSmall>
                                    </Flex>
                                </div>

                                <div style={{ minWidth: 168, marginLeft: 'auto' }}>
                                    {radial.map((item) => (
                                        <Flex key={item.name} align='center' justify='space-between'>
                                            <Flex align='center' gap={4}>
                                                <StyledDot color={item.radialColor} />
                                                <span>{item.label}</span>
                                            </Flex>
                                            <StyledTextSmallBold color={item.radialTextColor} style={{ minWidth: 40 }}>
                                                {item.count}
                                            </StyledTextSmallBold>
                                        </Flex>
                                    ))}
                                </div>
                            </Flex>
                        </StyledPaper>
                    );
                })}

                <StyledPaper>
                    <Calendar fullscreen={false} headerRender={CalendarHeader} onPanelChange={handlePanelChange} />
                </StyledPaper>
            </StyledPaper>
        </Flex>
    );
}
export default DashboardPage;
