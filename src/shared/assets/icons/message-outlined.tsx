import { customIcon } from '~hoc';

const MessageOutlinedSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='4.57986' cy='14.4016' r='0.708276' fill='currentColor' />
        <circle cx='6.9407' cy='14.4016' r='0.708276' fill='currentColor' />
        <circle cx='9.30154' cy='14.4016' r='0.708276' fill='currentColor' />
        <g clipPath='url(#clip0_5227_5249)'>
            <path
                d='M13.0697 5.18945C13.5212 5.18945 13.9317 5.31748 14.2862 5.59915C14.9579 6.14053 15.0549 7.05868 14.4915 7.7098C14.3161 7.91465 14.1071 8.09755 13.9093 8.28044C13.663 8.50724 13.4839 8.75232 13.4988 9.1108C13.51 9.37052 13.2899 9.54245 13.0324 9.53513C12.7898 9.52416 12.6219 9.3376 12.6107 9.07788C12.5883 8.60235 12.7562 8.19997 13.0846 7.85978C13.3085 7.62567 13.5548 7.41716 13.775 7.17939C14.0772 6.85749 14.0101 6.43682 13.622 6.21369C13.5026 6.14419 13.357 6.09663 13.2152 6.07834C12.7674 6.02347 12.3644 6.15882 12.1927 6.7258C12.1218 6.96723 11.8718 7.0916 11.6404 7.0221C11.3979 6.9526 11.271 6.72215 11.3382 6.46975C11.5397 5.68694 12.2077 5.19311 13.0697 5.18945Z'
                fill='currentColor'
            />
            <path
                d='M13.0732 9.9885C13.327 9.99581 13.5136 10.1897 13.5061 10.4311C13.4987 10.6799 13.2934 10.8628 13.0359 10.8518C12.7896 10.8408 12.6031 10.6433 12.6142 10.4018C12.6217 10.1604 12.8195 9.98118 13.0732 9.9885Z'
                fill='currentColor'
            />
        </g>
        <path
            d='M20.9999 8.18601C20.9999 10.0609 19.9886 11.7464 18.3784 12.9193C18.3226 12.9583 18.292 13.0251 18.2892 13.092L18.2196 14.9168C18.2112 15.1619 17.941 15.304 17.7348 15.1731L16.1886 14.2008C16.1886 14.2008 16.1886 14.2008 16.1858 14.2008C16.0967 14.1423 15.9881 14.1256 15.8878 14.1562C14.9684 14.4431 13.9683 14.6019 12.9208 14.6019C12.9068 14.6019 12.8929 14.6019 12.879 14.6019C12.9068 14.4181 12.9208 14.2314 12.9208 14.042C12.9208 11.426 10.2519 9.30594 6.95894 9.30594C6.28196 9.30594 5.63285 9.39509 5.02552 9.55946C4.90294 9.1165 4.83887 8.65404 4.83887 8.18044C4.83887 4.63398 8.45497 1.76172 12.918 1.76172C17.3838 1.76729 20.9999 4.64234 20.9999 8.18601Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeMiterlimit={10}
        />
        <path
            d='M5.02842 9.56445C2.68547 10.2024 1 11.9687 1 14.047C1 15.4288 1.74662 16.6741 2.93342 17.5405C2.97521 17.5711 2.99749 17.6185 3.00028 17.6686L3.05042 19.0142C3.056 19.1953 3.25658 19.2984 3.40981 19.2037L4.55203 18.4849C4.56038 18.4793 4.57153 18.471 4.57989 18.4654C4.62167 18.432 4.67739 18.4208 4.72754 18.4376C5.41844 18.6604 6.17064 18.783 6.96183 18.783C10.0152 18.783 12.5336 16.9582 12.8819 14.6069'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeMiterlimit={10}
        />
        <defs>
            <clipPath id='clip0_5227_5249'>
                <rect width='3.54138' height='5.66621' fill='none' transform='translate(11.3193 5.18945)' />
            </clipPath>
        </defs>
    </svg>
);
const MessageOutlinedIcon = customIcon(MessageOutlinedSvg);

export default MessageOutlinedIcon;
