import type { IconType } from "./icon.types";

export interface ISubItem {
  id: number;
  name: string;
}

export interface ISidebarItem {
  id: number;
  name: string;
  iconComponent: React.ComponentType<IconType>;
  subItems?: ISubItem[];
}

export interface UserProfile {
  name: string;
  username: string;
  avatar?: string;
}

