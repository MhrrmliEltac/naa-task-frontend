import Logo from "../Logo";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-2 px-6 pb-8 border-b border-[#F3F3F3]">
      <Logo />
      <span className="font-lato text-[18px] font-medium text-black">
        NAA Control Panel
      </span>
    </div>
  );
};

export default SidebarHeader;
