import { customIcon } from '~hoc';

const MonitorOutlinedSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M5.3665 1.66602H14.6248C17.5915 1.66602 18.3332 2.40768 18.3332 5.36602V10.641C18.3332 13.6077 17.5915 14.341 14.6332 14.341H5.3665C2.40817 14.3493 1.6665 13.6077 1.6665 10.6493V5.36602C1.6665 2.40768 2.40817 1.66602 5.3665 1.66602Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M10 14.3496V18.3329'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M1.6665 10.834H18.3332'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M6.25 18.334H13.75'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
const MonitorOutlinedIcon = customIcon(MonitorOutlinedSvg);

export default MonitorOutlinedIcon;
