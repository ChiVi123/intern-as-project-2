import { customIcon } from '~hoc';

const XMarkSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M15 5L5 15' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
        <path d='M5 5L15 15' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
);
const XMarkIcon = customIcon(XMarkSvg);

export default XMarkIcon;
