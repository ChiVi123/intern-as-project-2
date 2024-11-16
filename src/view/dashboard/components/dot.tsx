import styled from '@emotion/styled';

const StyledDot = styled.span<{ color: string }>((props) => ({
    display: 'inline-block',
    width: 4,
    height: 4,
    backgroundColor: props.color,
    borderRadius: '100%',
}));

export default StyledDot;
