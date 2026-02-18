const EcuadorFlag = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        className={className}
    >
        <rect fill="#FFDD00" width="900" height="300" y="0" />
        <rect fill="#0055A4" width="900" height="150" y="300" />
        <rect fill="#D21034" width="900" height="150" y="450" />
        <path d="M450 225 L420 255 L480 255 Z M450 225 L450 375 M420 255 L390 225 M480 255 L510 225 M420 345 L390 375 M480 345 L510 375" stroke="#000000" strokeWidth="10" fill="none" />
    </svg>
);

export default EcuadorFlag;
