import styled from '@emotion/styled';

const StyledPaper = styled.div({
    paddingBlock: 8,
    paddingInline: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    boxShadow: '2px 2px 15px 0px #4640431A',
    '& + &': { marginTop: 12 },
});

export default StyledPaper;
