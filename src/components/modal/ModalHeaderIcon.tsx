import { Box } from "@mui/material";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import CheckCircleIcon from "../../assets/icons/CheckCircleIcon";

const ModalHeaderIcon = ({ action }: { action: "Remove" | "Add" | "Edit" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: action === "Remove" ? "#FDEEEE" : "#CEFFE1",
        borderRadius: "50%",
        width: "96px",
        height: "96px",
        mb: "24px",
      }}
    >
      {action === "Remove" ? (
        <DeleteIcon width="40px" height="40px" fill="#D82C2C" />
      ) : (
        <CheckCircleIcon width="72px" height="72px" fill="#00CE4F" />
      )}
    </Box>
  );
};

export default ModalHeaderIcon;
