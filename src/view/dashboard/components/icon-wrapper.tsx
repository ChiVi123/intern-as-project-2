import styled from '@emotion/styled';

const StyledIconWrapper = styled.div<{ iconColor: string; bg: string }>((props) => ({
    width: 40,
    height: 40,
    borderRadius: '100%',
    backgroundColor: props.bg,
    color: props.iconColor,
}));

export default StyledIconWrapper;
