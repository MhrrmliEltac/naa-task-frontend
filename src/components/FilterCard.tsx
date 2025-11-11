import type { ReactNode } from "react";

const FilterCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-6 rounded-[12px] bg-white border border-[#F7F7F7] shadow-sidebar">
      {children}
    </div>
  );
};

export default FilterCard;
