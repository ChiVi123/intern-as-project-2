import { Flex, Typography } from 'antd';
import { HeaderRender } from 'antd/es/calendar/generateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { designToken } from '~core';
import { AngleRightIcon } from '~icons';

dayjs.extend(dayLocaleData);

const CalendarHeader: HeaderRender<Dayjs> = ({ value, onChange }) => {
    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
        current = current.month(i);
        months.push(localeData.monthsShort(current));
    }

    const year = value.year();
    const month = value.month();

    const handlePrevMonth = () => {
        const newMonth = month - 1;
        const now = value.clone().month(newMonth);
        onChange(now);
    };
    const handleNextMonth = () => {
        const newMonth = month + 1;
        const now = value.clone().month(newMonth);
        onChange(now);
    };

    return (
        <Flex align='center' justify='space-between' style={{ padding: 8 }}>
            <AngleRightIcon
                role='button'
                aria-label='previous month'
                style={{ fontSize: '1.25rem', color: designToken['orange-500'], rotate: '180deg', userSelect: 'none' }}
                onClick={handlePrevMonth}
            />
            <Typography.Title level={5} style={{ margin: 0, fontWeight: 700, color: designToken['orange-500'] }}>
                {value.date() + ' ' + months[month] + ' ' + year}
            </Typography.Title>

            <AngleRightIcon
                role='button'
                aria-label='next month'
                style={{ fontSize: '1.25rem', color: designToken['orange-500'], userSelect: 'none' }}
                onClick={handleNextMonth}
            />
        </Flex>
    );
};

export default CalendarHeader;
