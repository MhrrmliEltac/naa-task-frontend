import { type ReactNode } from "react";

interface ButtonProps {
  btnText?: string;
  bgColor: string;
  onClick: () => void;
  border?: boolean;
  textColor?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  btnText,
  bgColor,
  onClick,
  border,
  textColor = "text-white",
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 cursor-pointer ${bgColor} ${
        border ? "border border-[#E5E5E5]" : ""
      } py-3 w-full rounded-lg transition-all duration-200 hover:opacity-90`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}

      {btnText && (
        <span
          className={`text-[18px] font-lato font-medium leading-6 ${textColor}`}
        >
          {btnText}
        </span>
      )}

      {icon && iconPosition === "right" && (
        <span className={`${btnText ? "" : "ml-auto"}`}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
