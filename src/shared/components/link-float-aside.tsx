import { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { designToken } from '~core';

interface IProps {
    to: string;
    title: string;
    icon: ElementType;
}

function LinkFloatAside({ to, title, icon: Icon }: IProps) {
    return (
        <Link to={to}>
            <div
                css={{
                    position: 'absolute',
                    top: 244,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 80,
                    paddingBlock: 12,
                    paddingInline: 4,
                    backgroundColor: designToken['orange-50'],
                    borderRadius: '8px 0 0 8px',
                    textAlign: 'center',
                    zIndex: 1,
                }}
            >
                <Icon css={{ fontSize: 28, color: designToken['orange-400'] }} />
                <span style={{ color: designToken['orange-500'] }}>{title}</span>
            </div>
        </Link>
    );
}

export default LinkFloatAside;
