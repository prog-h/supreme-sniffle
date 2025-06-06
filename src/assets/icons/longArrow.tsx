interface Props {
  rotate?: number;
  color?: string;
}

const LongArrow = ({ rotate = 0, color = "#1e4a16" }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M7.17786 13.5523L2.62536 8.99977L7.17786 4.44727"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3748 9L2.75226 9"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LongArrow;
