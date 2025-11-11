import type { IconType } from "../../types/icon.types";

const CancelIcon = ({ width, height, fill }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.605L11.608 1M1 1L11.608 11.605"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CancelIcon;
