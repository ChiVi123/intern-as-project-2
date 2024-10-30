import { CustomIcon } from '~hoc';

const ChevronDownSolidSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M6 9L12 15L18 9' fill='currentColor' />
        <path
            d='M6 9L12 15L18 9H6Z'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
const ChevronDownSolidIcon = CustomIcon(ChevronDownSolidSvg);

export default ChevronDownSolidIcon;
