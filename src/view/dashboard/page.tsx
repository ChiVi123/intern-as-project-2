import { Area, RadialBar, Tooltip } from '@ant-design/plots';
import { Calendar, CalendarProps, Card, Flex, Form, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { ElementType, useEffect, useState } from 'react';
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
import { countGroupedBy } from '~modules/queueing';
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

type AreaValue = { date: Date | string; count: number };
type RadialValue = {
    group: string;
    groupName: string;
    textColor: string;
    total: number;
    ago: number;
    data: {
        dotColor: string;
        name: string;
        label: string;
        count: number;
        priority: number;
        ago: number;
    }[];
};
type GroupByDate = 'day' | 'week' | 'month';
const groupByMap = {
    day: 'Ngày',
    week: 'Tuần',
    month: 'Tháng',
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

const calPercent = (a: number, b: number): string => {
    const percent = ((1 - Math.min(a, b) / Math.max(a, b)) * 100).toFixed(2);
    return percent.replace(/\./g, ',') + '%';
};

function DashboardPage() {
    const loader = useLoaderData() as { radials: RadialValue[]; defaultOldest: Timestamp };
    const [area, setArea] = useState<AreaValue[]>([]);
    const [groupBy, setGroupBy] = useState<GroupByDate>('day');

    const queueRadial = loader.radials[2];

    useEffect(() => {
        (async function () {
            const result = await countGroupedBy(loader.defaultOldest.toDate(), new Date(), groupBy);
            setArea(
                Object.entries(result).map(([key, count]) => ({
                    date: key.includes('-W') ? key.split('-W')[1] : new Date(key),
                    count,
                })),
            );
        })();
    }, [groupBy, loader.defaultOldest]);

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
                            total={'' + queueRadial.total}
                            content='Số thứ tự đã cấp'
                            value={calPercent(queueRadial.total, queueRadial.ago)}
                            down={queueRadial.ago > queueRadial.total}
                            bg='#6695FB26'
                            iconColor='#6695FB'
                            tagColor={queueRadial.ago > queueRadial.total ? '#E73F3F26' : '#FF950126'}
                            icon={<CalendarEmptyOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total={'' + queueRadial.data[0].count}
                            content='Số thứ tự đã sử dụng'
                            value={calPercent(queueRadial.data[0].count, queueRadial.data[0].ago)}
                            down={queueRadial.data[0].ago > queueRadial.data[0].count}
                            bg='#35C75A26'
                            iconColor='#35C75A'
                            tagColor={queueRadial.data[0].ago > queueRadial.data[0].count ? '#E73F3F26' : '#FF950126'}
                            icon={<CalendarCheckedOutlinedIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total={'' + queueRadial.data[1].count}
                            content='Số thứ tự đang chờ'
                            value={calPercent(queueRadial.data[1].count, queueRadial.data[1].ago)}
                            down={queueRadial.data[1].ago > queueRadial.data[1].count}
                            bg='#FFAC6A26'
                            iconColor='#FFAC6A'
                            tagColor={queueRadial.data[1].ago > queueRadial.data[1].count ? '#E73F3F26' : '#FF950126'}
                            icon={<UserCallIcon />}
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', width: 'calc(100% / 4)', paddingInline: 4 }}>
                        <CardStatistics
                            total={'' + queueRadial.data[2].count}
                            content='Số thứ tự đã bỏ qua'
                            value={calPercent(queueRadial.data[2].count, queueRadial.data[2].ago)}
                            down={queueRadial.data[2].ago > queueRadial.data[2].count}
                            bg='#F86D6D26'
                            iconColor='#F86D6D'
                            tagColor={queueRadial.data[2].ago > queueRadial.data[2].count ? '#E73F3F26' : '#FF950126'}
                            icon={<BookmarkStarIcon />}
                        />
                    </div>
                </Flex>

                <Card>
                    <Flex align='center' justify='space-between' style={{ marginBottom: 12 }}>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            Bảng thống kê theo {groupByMap[groupBy].toLowerCase()}
                        </Typography.Title>
                        <Form.Item label='Xem theo' style={{ margin: 0 }}>
                            <Select
                                placeholder='Chọn để xem'
                                options={[
                                    { label: 'Ngày', value: 'day' },
                                    { label: 'Tuần', value: 'week' },
                                    { label: 'Tháng', value: 'month' },
                                ]}
                                value={groupBy}
                                onChange={(v) => setGroupBy(v as GroupByDate)}
                                suffixIcon={<ChevronDownSolidIcon />}
                            />
                        </Form.Item>
                    </Flex>
                    <Area
                        width={626}
                        height={362}
                        data={{ type: 'inline', value: area }}
                        xField={(d: { date: Date | string }) =>
                            typeof d.date === 'string' ? d.date : d.date.getDate()
                        }
                        yField='count'
                        shapeField='smooth'
                        tooltip={{ title: false } as Tooltip}
                        axis={{ x: { title: 'Sl/' + groupByMap[groupBy].toLowerCase() } }}
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

                {loader.radials.map((radial) => {
                    const data = [...radial.data].sort((a, b) => b.priority - a.priority);
                    let Icon: ElementType;

                    switch (radial.group) {
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
                        <StyledPaper key={radial.group}>
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
                                        scale={{ y: { domain: [0, radial.total] } }}
                                        markBackground={{ opacity: 0.25 }}
                                        sizeField={10}
                                        style={{
                                            radius: 180,
                                            fill: fills[radial.group],
                                        }}
                                    />
                                    <StyledRadialText>
                                        {Math.round((radial.data[0].count / radial.total) * 100)}%
                                    </StyledRadialText>
                                </StyledRadialWrapper>

                                <div style={{ marginLeft: 12 }}>
                                    <StyledTextLarge>{radial.total}</StyledTextLarge>

                                    <Flex gap={4} style={{ color: radial.textColor }}>
                                        <Icon size={14} />
                                        <StyledTextSmall>{radial.groupName}</StyledTextSmall>
                                    </Flex>
                                </div>

                                <div style={{ minWidth: 168, marginLeft: 'auto' }}>
                                    {radial.data.map((item) => (
                                        <Flex key={item.name} align='center' justify='space-between'>
                                            <Flex align='center' gap={4}>
                                                <StyledDot color={item.dotColor} />
                                                <span>{item.label}</span>
                                            </Flex>
                                            <StyledTextSmallBold color={radial.textColor} style={{ minWidth: 40 }}>
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
