import { motion, AnimatePresence } from "framer-motion";
import ArrowDown from "../../assets/icons/ArrowDown";
import type { ISidebarItem } from "../../types/sidebar.types";

interface SidebarMenuProps {
  items: ISidebarItem[];
  activeItem: number | null;
  activeSubItem: string | null;
  toggleItem: (id: number) => void;
  handleSubItemClick: (parentName: string, subName: string) => void;
}

const SidebarMenu = ({
  items,
  activeItem,
  activeSubItem,
  toggleItem,
  handleSubItemClick,
}: SidebarMenuProps) => {
  return (
    <nav className="flex-1 overflow-y-auto px-[19px] pt-6 gap-1">
      {items.map((item) => {
        const isActive = activeItem === item.id;
        const IconComponent = item.iconComponent;

        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between p-5 rounded-xl transition-all cursor-pointer
                ${
                  activeItem === item.id
                    ? "bg-[#243C7B] text-white"
                    : "text-[#787486]"
                }`}
            >
              <div className="flex items-center gap-2 font-medium text-[14px] leading-5 tracking-[-1%]">
                <IconComponent width="18px" height="18px" active={isActive} />
                <span>{item.name}</span>
              </div>
              <motion.div
                animate={{ rotate: activeItem === item.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowDown
                  width="14"
                  height="14"
                  fill={activeItem === item.id ? "#fff" : "#787486"}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {activeItem === item.id && item.subItems && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 flex flex-col p-5 gap-4 overflow-hidden border border-[#F7F7F7] rounded-xl shadow-sidebar"
                >
                  {item.subItems.map((sub) => {
                    const isActive =
                      activeSubItem === `${item.name}-${sub.name}`;
                    return (
                      <li
                        key={sub.id}
                        onClick={() => handleSubItemClick(item.name, sub.name)}
                        className={`text-[15px] transition cursor-pointer ${
                          isActive
                            ? "text-[#243C7B] font-medium"
                            : "text-[#6B7280] hover:text-[#2F54EB]"
                        }`}
                      >
                        {sub.name}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
