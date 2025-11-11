import { styled } from "@mui/material";
import { useMemo } from "react";
import ReactQuill from "react-quill-new";

interface HTMLContentSectionProps {
  value: string;
  setValue: (val: string) => void;
}

const TextEditorWrapper = styled("div")(() => ({
  "& .quill": {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  "& .ql-toolbar": {
    backgroundColor: "rgba(236, 236, 240, 0.3)",
    border: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  "& .ql-container": {
    border: "none",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    height: "240px",
    "& .ql-editor": {
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
      height: "240px",
    },
  },
}));

const HTMLContentSection = ({ value, setValue }: HTMLContentSectionProps) => {
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ header: 1 }, { header: 2 }, { header: 3 }],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    }),
    []
  );

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "header",
    "align",
    "list",
    "bullet",
    "link",
  ];

  return (
    <TextEditorWrapper>
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={quillModules}
        formats={quillFormats}
      />
    </TextEditorWrapper>
  );
};

export default HTMLContentSection;
