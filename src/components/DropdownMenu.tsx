import { useState } from "react";
import type {
  DropdownList,
  DropdownMenuProps,
  MenuValueType,
} from "../types/dropdown.types";
import { Type } from "../constants/enums";
import { motion } from "framer-motion";
import ArrowDown from "../assets/icons/ArrowDown";

const DropdownMenu = ({
  title,
  options,
  prevIcon,
  setMenuValue,
  type,
  callback,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (value: string) => {
    switch (type) {
      case Type.Post:
        setMenuValue((prev: MenuValueType) => {
          const updated = { ...prev, postValue: value };
          callback(updated);
          return updated;
        });
        return;

      case Type.Status:
        setMenuValue((prev: MenuValueType) => {
          const updated = { ...prev, statusValue: value };
          callback(updated);
          return updated;
        });
        return;

      case Type.Publish:
        setMenuValue((prev: MenuValueType) => {
          const updated = { ...prev, publishValue: value };
          callback(updated);
          return updated;
        });
        return;
    }
  };

  const selectedOption = options.find((option) => option.listName === title);
  const displayIcon = selectedOption?.prevIcon || prevIcon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="min-w-[146px] w-full px-3 py-[7px] flex justify-between items-center cursor-pointer border border-[#E5E7EB] rounded-[10px]"
      >
        <div className="flex items-center gap-2">
          {displayIcon && displayIcon}
          <span className="text-[#0A0A0A] text-[14px] leading-5">{title}</span>
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
            {options.map((item: DropdownList) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.listName)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {item.prevIcon && item.prevIcon}
                <span
                  className={`${
                    title === item.listName
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

export default DropdownMenu;
