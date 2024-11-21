import { customIcon } from '~hoc';

const BookmarkStarSvg = () => (
    <svg width='1em' height='1em' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M12.26 6.15C12.2819 6.10502 12.3161 6.06711 12.3585 6.04058C12.4009 6.01406 12.45 6 12.5 6C12.5501 6 12.5991 6.01406 12.6415 6.04058C12.684 6.06711 12.7181 6.10502 12.74 6.15L13.691 8.0775C13.7101 8.11649 13.7383 8.15025 13.7733 8.17587C13.8084 8.20148 13.8491 8.21817 13.892 8.2245L16.022 8.5335C16.2395 8.565 16.328 8.8335 16.169 8.988L14.63 10.4895C14.599 10.5198 14.5758 10.5572 14.5624 10.5985C14.5491 10.6398 14.546 10.6838 14.5535 10.7265L14.9165 12.8475C14.9247 12.8965 14.919 12.9468 14.9002 12.9927C14.8813 13.0386 14.85 13.0784 14.8098 13.1075C14.7696 13.1367 14.7221 13.154 14.6726 13.1576C14.6231 13.1613 14.5735 13.151 14.5295 13.128L12.6245 12.126C12.5863 12.106 12.5439 12.0956 12.5008 12.0956C12.4577 12.0956 12.4152 12.106 12.377 12.126L10.472 13.128C10.4281 13.1506 10.3787 13.1605 10.3294 13.1567C10.2801 13.1529 10.2329 13.1355 10.1929 13.1064C10.153 13.0773 10.1219 13.0377 10.1031 12.992C10.0843 12.9463 10.0786 12.8963 10.0865 12.8475L10.4495 10.7265C10.4572 10.6839 10.4543 10.64 10.4413 10.5987C10.4282 10.5575 10.4053 10.52 10.3745 10.4895L8.82952 8.988C8.79413 8.95325 8.76911 8.90934 8.75728 8.86117C8.74545 8.81301 8.74727 8.7625 8.76253 8.71531C8.77779 8.66812 8.8059 8.62612 8.84369 8.59401C8.88149 8.56189 8.92748 8.54094 8.97652 8.5335L11.1065 8.2245C11.1494 8.21817 11.1902 8.20148 11.2252 8.17587C11.2602 8.15025 11.2885 8.11649 11.3075 8.0775L12.26 6.15Z'
            fill='currentColor'
        />
        <path
            d='M3.5 3C3.5 2.20435 3.81607 1.44129 4.37868 0.87868C4.94129 0.316071 5.70435 0 6.5 0L18.5 0C19.2956 0 20.0587 0.316071 20.6213 0.87868C21.1839 1.44129 21.5 2.20435 21.5 3V23.25C21.4999 23.3857 21.4631 23.5188 21.3933 23.6351C21.3236 23.7515 21.2236 23.8468 21.104 23.9108C20.9844 23.9748 20.8497 24.0052 20.7142 23.9988C20.5787 23.9923 20.4474 23.9492 20.3345 23.874L12.5 19.6515L4.6655 23.874C4.55256 23.9492 4.42135 23.9923 4.28584 23.9988C4.15033 24.0052 4.0156 23.9748 3.896 23.9108C3.7764 23.8468 3.67641 23.7515 3.60667 23.6351C3.53694 23.5188 3.50007 23.3857 3.5 23.25V3ZM6.5 1.5C6.10218 1.5 5.72064 1.65804 5.43934 1.93934C5.15804 2.22064 5 2.60218 5 3V21.849L12.0845 18.126C12.2076 18.0441 12.3521 18.0004 12.5 18.0004C12.6479 18.0004 12.7924 18.0441 12.9155 18.126L20 21.849V3C20 2.60218 19.842 2.22064 19.5607 1.93934C19.2794 1.65804 18.8978 1.5 18.5 1.5H6.5Z'
            fill='currentColor'
        />
    </svg>
);
const BookmarkStarIcon = customIcon(BookmarkStarSvg);

export default BookmarkStarIcon;