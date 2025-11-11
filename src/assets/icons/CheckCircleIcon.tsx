import type { IconType } from "../../types/icon.types";

const CheckCircleIcon = ({ width, height, fill }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_0_3601"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <rect width={width} height={height} fill={fill} />
      </mask>
      <g mask="url(#mask0_0_3601)">
        <path
          d="M31.8 49.8L52.95 28.65L48.75 24.45L31.8 41.4L23.25 32.85L19.05 37.05L31.8 49.8ZM36 66C31.85 66 27.95 65.212 24.3 63.636C20.65 62.062 17.475 59.925 14.775 57.225C12.075 54.525 9.938 51.35 8.364 47.7C6.788 44.05 6 40.15 6 36C6 31.85 6.788 27.95 8.364 24.3C9.938 20.65 12.075 17.475 14.775 14.775C17.475 12.075 20.65 9.937 24.3 8.361C27.95 6.787 31.85 6 36 6C40.15 6 44.05 6.787 47.7 8.361C51.35 9.937 54.525 12.075 57.225 14.775C59.925 17.475 62.062 20.65 63.636 24.3C65.212 27.95 66 31.85 66 36C66 40.15 65.212 44.05 63.636 47.7C62.062 51.35 59.925 54.525 57.225 57.225C54.525 59.925 51.35 62.062 47.7 63.636C44.05 65.212 40.15 66 36 66Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default CheckCircleIcon;
