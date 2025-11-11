import { useState } from "react";
import HomeIcon from "../assets/icons/HomeIcon";
import BookIcon from "../assets/icons/BookIcon";
import WeatherIcon from "../assets/icons/WeatherIcon";
import MuseumIcon from "../assets/icons/MuseumIcon";
import type { ISidebarItem, UserProfile } from "../types/sidebar.types";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarFooter from "./sidebar/SidebarFooter";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const user: UserProfile = {
    name: "Khayal Ahmadi",
    username: "khahmadli",
    avatar: "/avatar.png",
  };

  const items: ISidebarItem[] = [
    {
      id: 1,
      name: "NAA Website",
      iconComponent: HomeIcon,
      subItems: [
        { id: 1, name: "Post" },
        { id: 2, name: "Media Library" },
        { id: 3, name: "System Settings" },
      ],
    },
    {
      id: 2,
      name: "Library",
      iconComponent: BookIcon,
    },
    {
      id: 3,
      name: "Meteorology",
      iconComponent: WeatherIcon,
    },
    {
      id: 4,
      name: "Museum",
      iconComponent: MuseumIcon,
    },
  ];

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const handleSubItemClick = (parentName: string, subName: string) => {
    setActiveSubItem(`${parentName}-${subName}`);
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  return (
    <aside className="max-w-[318px] w-full h-full flex flex-col bg-white border-r shadow-sidebar border-[#F7F7F7] rounded-tr-2xl rounded-br-2xl py-6 overflow-hidden">
      {/* Sidebar Header */}
      <SidebarHeader />

      {/* Sidebar Menu */}
      <SidebarMenu
        items={items}
        activeItem={activeItem}
        activeSubItem={activeSubItem}
        toggleItem={toggleItem}
        handleSubItemClick={handleSubItemClick}
      />

      {/* Sidebar Footer */}
      <SidebarFooter
        user={user}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
      />
    </aside>
  );
};

export default Sidebar;
