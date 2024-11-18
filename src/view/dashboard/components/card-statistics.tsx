import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactNode } from 'react';
import { designToken } from '~core';
import StyledPaper from './paper';
import StyledTag from './tag';
import StyledTextLarge from './text-large';
import StyledTextSmallBold from './text-small-bold';

interface IProps {
    down?: boolean;
    tagColor: string;
    iconColor: string;
    bg: string;
    total: string;
    value: string;
    content: string;
    icon: ReactNode;
}

function CardStatistics({ down, iconColor, tagColor, bg, total, value, content, icon }: IProps) {
    return (
        <StyledPaper>
            <Flex align='center' gap={6}>
                <div
                    css={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                        borderRadius: '100%',
                        backgroundColor: bg,
                        color: iconColor,
                        '& .anticon[role=img]': {
                            fontSize: '1.3rem',
                        },
                    }}
                >
                    {icon}
                </div>

                <StyledTextSmallBold color={designToken['gray-400']} style={{ maxWidth: 92 }}>
                    {content}
                </StyledTextSmallBold>
            </Flex>
            <Flex align='center' justify='space-between' style={{ marginTop: 12 }}>
                <StyledTextLarge>{total}</StyledTextLarge>
                <StyledTag color={tagColor} bordered={false} icon={down ? <ArrowDownOutlined /> : <ArrowUpOutlined />}>
                    {value}
                </StyledTag>
            </Flex>
        </StyledPaper>
    );
}

export default CardStatistics;
