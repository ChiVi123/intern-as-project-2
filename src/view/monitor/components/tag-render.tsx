import styled from '@emotion/styled';
import { SelectProps, Tag } from 'antd';
import { XMarkIcon } from '~icons';

type TagRender = SelectProps['tagRender'];

const StyledCloseIcon = styled(XMarkIcon)({
    '& > svg': { fontSize: '1.125rem', color: 'white' },
});
const StyledTag = styled(Tag)({
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 4,
    marginBlock: 8,
    lineHeight: 1.5,
});

const TagRenderCustom: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <StyledTag
            closable={closable}
            closeIcon={<StyledCloseIcon />}
            style={{ marginRight: 4 }}
            onMouseDown={onPreventMouseDown}
            onClose={onClose}
        >
            {label}
        </StyledTag>
    );
};

export default TagRenderCustom;
