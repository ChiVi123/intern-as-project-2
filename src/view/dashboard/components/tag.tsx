import styled from '@emotion/styled';
import { Tag, TagProps } from 'antd';

const StyledTag = styled(Tag)<TagProps>((props) => ({ '&&': { borderRadius: 999, color: props.color?.slice(0, 7) } }));
export default StyledTag;
