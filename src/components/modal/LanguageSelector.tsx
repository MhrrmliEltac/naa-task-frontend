import { Box } from "@mui/material";
import AzFlag from "../../assets/icons/AzFlag";
import UkFlag from "../../assets/icons/UkFlag";

interface Language {
  code: string;
  label: string;
  icon: React.ReactNode;
}

interface LanguageSelectorProps {
  activeLang: string;
  onLanguageChange: (code: string) => void;
}

const languages: Language[] = [
  { code: "AZ", label: "AZ", icon: <AzFlag /> },
  { code: "EN", label: "EN", icon: <UkFlag /> },
];

const LanguageSelector = ({
  activeLang,
  onLanguageChange,
}: LanguageSelectorProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
        mb: "12px",
      }}
    >
      <Box sx={{ width: "136px", display: "flex", gap: "8px", mb: "12px" }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[20px] cursor-pointer transition-all duration-200 
              ${
                activeLang === lang.code
                  ? "border border-[#243C7B]"
                  : "border border-[#D9D9D9]"
              }`}
          >
            {lang.icon}
            <span className="text-[#141414]">{lang.label}</span>
          </button>
        ))}
      </Box>
    </Box>
  );
};

export default LanguageSelector;
