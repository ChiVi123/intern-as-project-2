import customIcon from '~hoc/custom-icon';

const LayerGroupOutlinedSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_5227_5264)'>
            <path
                d='M1.6665 14.166L9.99984 18.3327L18.3332 14.166'
                stroke='currentColor'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M1.6665 10L9.99984 14.1667L18.3332 10'
                stroke='currentColor'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.99984 1.66602L1.6665 5.83268L9.99984 9.99935L18.3332 5.83268L9.99984 1.66602Z'
                stroke='currentColor'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </g>
        <defs>
            <clipPath id='clip0_5227_5264'>
                <rect width={20} height={20} fill='none' />
            </clipPath>
        </defs>
    </svg>
);
const LayerGroupOutlinedIcon = customIcon(LayerGroupOutlinedSvg);

export default LayerGroupOutlinedIcon;
