import PlusIcon from "../assets/icons/PlusIcon";
import type { OpenType } from "../types/modal.types";

interface PageHeaderProps {
  pageName: string;
  postCount: number;
  btnText: string;
  handleOpen: (name: keyof OpenType, action: string) => void;
}

const PageHeader = ({
  pageName,
  postCount,
  btnText,
  handleOpen,
}: PageHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium leading-8 text-black">
          {pageName}
        </h1>
        <span className="text-[14px] font-medium text-[#787486] leading-5 tracking-[-1%]">
          {postCount} Posts
        </span>
      </div>

      <button
        className="px-3 py-2 flex gap-2 items-center bg-[#243C7B] rounded-4xl text-white cursor-pointer"
        onClick={() => handleOpen("contentModal", "Add")}
      >
        <div className="flex items-center justify-center rounded-[20px] bg-[#3D5DB2] p-1">
          <PlusIcon width="16px" height="16px" fill="white" />
        </div>
        <span className="font-medium text-[16px] leading-6">{btnText}</span>
      </button>
    </div>
  );
};

export default PageHeader;
