import Settings from "../../assets/icons/Settings";
import type { UserProfile } from "../../types/sidebar.types";

interface SidebarFooterProps {
  user: UserProfile;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const SidebarFooter = ({
  user,
  onSettingsClick,
  onProfileClick,
}: SidebarFooterProps) => {
  return (
    <div className="mt-auto px-[19px] pt-4 border-t border-[#F3F3F3]">
      {/* Settings */}
      <button
        onClick={onSettingsClick}
        className="w-full flex items-center gap-2 p-5 rounded-xl transition-all cursor-pointer border border-[#F7F7F7] text-[#787486] shadow-sidebar"
      >
        <Settings width="18px" height="18px" />
        <span className="font-medium text-[14px] leading-5 tracking-[-1%]">
          Settings
        </span>
      </button>

      {/* User Profile */}
      <button
        onClick={onProfileClick}
        className="w-full flex items-center gap-3 p-5 rounded-xl transition-all cursor-pointer bg-[#243C7B] text-white mt-[10px] shadow-sidebar"
      >
        <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-medium text-[14px] text-start leading-[18px] tracking-normal whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {user.name}
          </span>
          <span className="text-[12px] text-[#D1D1D1] text-start whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {user.username}
          </span>
        </div>
      </button>
    </div>
  );
};

export default SidebarFooter;
