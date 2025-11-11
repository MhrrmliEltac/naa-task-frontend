import React from "react";
import NewsIcon from "../../assets/icons/NewsIcon";
import AnnouncementIcon from "../../assets/icons/AnnouncementIcon";

interface CategoryItem {
  type: string;
  label: string;
  Icon: React.ComponentType<{ width: string; height: string; fill: string }>;
}

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: CategoryItem[] = [
  {
    type: "News",
    label: "News",
    Icon: NewsIcon,
  },
  {
    type: "Announcement",
    label: "Announcement",
    Icon: AnnouncementIcon,
  },
];

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) => {
  return (
    <label className="flex flex-col gap-2 text-[14px] font-medium font-lato leading-3.5 text-[#374151]">
      Category
      <div className="flex items-center gap-2">
        {categories.map((cat) => {
          const IconComponent = cat.Icon;
          return (
            <button
              key={cat.type}
              type="button"
              className={`border border-[#1447E6] ${
                selectedCategory === cat.type && "bg-[#1447E6]"
              } flex items-center justify-center gap-2 px-3 py-2 rounded-full cursor-pointer`}
              onClick={() => onCategoryChange(cat.type)}
            >
              <IconComponent
                width="20"
                height="20"
                fill={selectedCategory === cat.type ? "white" : "#1447E6"}
              />
              <span
                className={`${
                  selectedCategory === cat.type
                    ? "text-white"
                    : "text-[#1447E6]"
                } font-normal font-lato leading-6 text-base`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </label>
  );
};

export default CategorySelector;
