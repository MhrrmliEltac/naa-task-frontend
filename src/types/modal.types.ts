import { QueryObserverResult } from "@tanstack/react-query";
import { Content, PaginatedResponse } from "./content.types";

export interface OpenType {
  contentModal: boolean;
  actionModal: boolean;
}

export interface ContentModalProps {
  open: boolean;
  showItem?: Content | null;
  handleClose: () => void;
  refetch: () => Promise<
    QueryObserverResult<PaginatedResponse<Content>, Error>
  >;
}

export type Category = "News" | "Announcement" | "";

export interface ActionModalProps {
  open: boolean;
  showItem?: Content | null;
  action: "Remove" | "Add" | "Edit";
  handleClose: () => void;
  handleDelete?: (id: string | undefined) => void;
}
