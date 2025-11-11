import { useState } from "react";
import type { OpenType } from "../types/modal.types";
import { Content } from "../types/content.types";

export const useModal = () => {
  const [open, setOpen] = useState<OpenType>({
    contentModal: false,
    actionModal: false,
  });

  const [showOneItem, setShowOneItem] = useState<Content | null>(null);

  const handleClose = (name: keyof OpenType) => {
    setOpen((prev) => ({ ...prev, [name]: false }));
  };

  const handleOpen = (name: keyof OpenType, action?: string) => {
    if (action === "Add") {
      setShowOneItem(null);
      setTimeout(() => {
        setOpen((prev) => ({ ...prev, [name]: true }));
      }, 0);
    } else {
      setOpen((prev) => ({ ...prev, [name]: true }));
    }
  };

  return {
    open,
    setOpen,
    showOneItem,
    setShowOneItem,
    handleClose,
    handleOpen,
  };
};
