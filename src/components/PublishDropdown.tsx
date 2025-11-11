import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import ArrowDown from "../assets/icons/ArrowDown";
import Circle from "./Circle";
import { PublishStatusType } from "../types/content.types";

interface Options {
  id: number;
  listName: PublishStatusType;
  prevIcon: ReactNode;
}

interface PublishDropdownProps {
  itemId: number | string;
  currentStatus: PublishStatusType;
  onStatusChange?: (
    itemId: string | number,
    status: "draft" | "published" | "archived"
  ) => void;
}

const PublishDropdown = ({ currentStatus }: PublishDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const options: Options[] = [
    {
      id: 1,
      listName: "Publish",
      prevIcon: <Circle color="#1DB100" />,
    },
    {
      id: 2,
      listName: "Draft",
      prevIcon: <Circle color="#F57C11" />,
    },
  ];

  const handleClick = (status: "draft" | "published" | "archived") => {
    // onStatusChange(itemId, status);
    console.log(status);
    setOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.listName === currentStatus
  );
  const displayIcon = selectedOption?.prevIcon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="min-w-[146px] w-full px-3 py-[7px] flex justify-between items-center cursor-pointer border border-[#E5E7EB] rounded-[10px]"
      >
        <div className="flex items-center gap-2">
          {displayIcon && displayIcon}
          <span className="text-[#0A0A0A] text-[14px] leading-5">
            {currentStatus}
          </span>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowDown width="14" height="14" fill="#787486" />
        </motion.div>
      </button>

      {open && (
        <div className="absolute left-0 top-full p-3 mt-2 w-full bg-white border border-[#F7F7F7] rounded-xl shadow-md z-10 shadow-sidebar">
          <ul className="flex flex-col gap-4">
            {options.map((item) => (
              <li
                key={item.id}
                onClick={() =>
                  handleClick(
                    item.listName as "draft" | "published" | "archived"
                  )
                }
                className="flex items-center gap-2 cursor-pointer"
              >
                {item.prevIcon && item.prevIcon}
                <span
                  className={`${
                    currentStatus === item.listName
                      ? "text-[#243C7B]"
                      : "text-[#787486]"
                  } font-medium leading-5 text-[14px] tracking-[-1%]`}
                >
                  {item.listName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PublishDropdown;
