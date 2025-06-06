interface Props {
  rotate?: number;
}

const ShortArrow = ({ rotate = 0 }: Props) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M5.625 10.375L1.25 6L5.625 1.625"
        stroke="#1e4a16"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShortArrow;
