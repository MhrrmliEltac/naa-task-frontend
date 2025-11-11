import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Type } from "../constants/enums";

export type StatusValueType = "Active" | "Inactive" | "All Status";

export interface MenuValueType {
  postValue?: string;
  statusValue?: StatusValueType;
  publishValue?: string;
}

export interface DropdownList {
  id: number;
  listName: string;
  prevIcon?: ReactNode;
  lastIcon?: ReactNode;
}

export interface DropdownMenuProps {
  title: string;
  prevIcon?: ReactNode;
  options: DropdownList[];
  setMenuValue: Dispatch<SetStateAction<MenuValueType>>;
  type: Type;
  callback: (updatedValue?: MenuValueType) => void;
}
