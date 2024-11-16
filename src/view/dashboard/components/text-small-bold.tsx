import styled from '@emotion/styled';

const StyledTextSmallBold = styled.div<{ color: string }>((props) => ({
    fontSize: '0.9rem',
    fontWeight: 700,
    lineHeight: 1.3,
    color: props.color,
}));

export default StyledTextSmallBold;
