import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { Type } from "../constants/enums";
import type { MenuValueType } from "../types/dropdown.types";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const [menuValue, setMenuValue] = useState<MenuValueType>({
    limitValue: `${limit} / Page`,
  });

  useEffect(() => {
    setMenuValue({
      limitValue: `${limit} / Page`,
    });
  }, [limit]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages === 0 || !totalPages) {
      return [];
    }

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) {
        start = 2;
        end = Math.min(6, totalPages - 1);
      }

      if (currentPage >= totalPages - 3) {
        start = Math.max(2, totalPages - 5);
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleLimitChange = (updatedValue?: MenuValueType) => {
    if (!updatedValue?.limitValue) return;

    setMenuValue(updatedValue);
    const newLimit = parseInt(updatedValue.limitValue.split(" /")[0]);
    onLimitChange(newLimit);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full flex justify-center items-center mt-[27px] gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={`flex items-center justify-center w-8 h-8 rounded ${
            currentPage === 1 || totalPages === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke={
                currentPage === 1 || totalPages === 0 ? "#9CA3AF" : "#243C7B"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-[#6B7280] text-[14px] font-lato cursor-pointer"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-medium font-lato transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#243C7B] text-white"
                    : "text-[#6B7280] hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`flex items-center justify-center w-8 h-8 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke={
                currentPage === totalPages || totalPages === 0
                  ? "#9CA3AF"
                  : "#243C7B"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center">
        <DropdownMenu
          title={menuValue.limitValue || `${limit} / Page`}
          setMenuValue={setMenuValue}
          type={Type.Limit}
          options={[
            { id: 1, listName: "10 / Page" },
            { id: 2, listName: "20 / Page" },
            { id: 3, listName: "50 / Page" },
            { id: 4, listName: "100 / Page" },
          ]}
          callback={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
