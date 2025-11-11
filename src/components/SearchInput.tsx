import type { ChangeEvent } from "react";
import SearchIcon from "../assets/icons/SearchIcon";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  name = "query",
  className = "",
}: SearchInputProps) => {
  return (
    <label
      className={`relative flex items-center min-w-[146px] border border-[#E5E7EB] rounded-[10px] bg-white px-3 py-[7px] transition ${className}`}
    >
      {/* Search Icon */}
      <span className="absolute left-3  flex items-center justify-center">
        <SearchIcon width="16" height="16" fill="#9CA3AF" />
      </span>

      {/* Input */}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-6 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none bg-transparent"
      />
    </label>
  );
};

export default SearchInput;
