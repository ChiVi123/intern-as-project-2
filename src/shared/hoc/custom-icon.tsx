import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { GetProps } from 'antd';
import { ComponentType, ForwardRefExoticComponent, SVGProps } from 'react';

type CustomIconComponentPropsType = GetProps<typeof Icon>;
type customSvgComponentType =
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | ForwardRefExoticComponent<CustomIconComponentProps>;

const customIcon = (component: customSvgComponentType) => (props: CustomIconComponentPropsType) =>
    <Icon {...props} component={component} />;

export default customIcon;
