import { Box, Card, CardContent, Modal } from "@mui/material";
import Button from "./Button";
import CancelButton from "./modal/CancelButton";
import ModalHeaderIcon from "./modal/ModalHeaderIcon";
import type { ActionModalProps } from "../types/modal.types";

const ActionModal = ({
  open,
  showItem,
  action,
  handleClose,
  handleDelete,
}: ActionModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.09)",
            maxWidth: "510px",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "8px" }}>
            <CancelButton handleClose={handleClose} />
          </Box>

          <Card
            sx={{
              maxWidth: "470px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: "40px",
              boxShadow: "none",
            }}
          >
            <ModalHeaderIcon action={action} />

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "none",
              }}
            >
              <span className="font-lato font-semibold leading-9 text-[24px] text-[#2A2A2A]">
                {action === "Remove"
                  ? "Delete Post"
                  : action === "Add"
                  ? "Added Successfully!"
                  : "Edit Successfully"}
              </span>
              <span className="text-center text-[14px] leading-5 font-lato">
                <span className="text-[#6A7282]">
                  {action === "Remove"
                    ? "Are you sure you want to delete the post - "
                    : action === "Add"
                    ? "Your news added successfully"
                    : "Your news edit successfully"}
                </span>
                {action === "Remove" && (
                  <span
                    className="text-[#4B505A] italic font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: showItem?.htmlContent || "",
                    }}
                  />
                )}
              </span>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
            {action === "Remove" ? (
              <>
                <Button
                  btnText="No"
                  bgColor="bg-[#fff]"
                  onClick={handleClose}
                  border
                  textColor="text-[#212121]"
                />
                <Button
                  btnText="Yes"
                  bgColor="bg-[#D82C2C]"
                  onClick={() => handleDelete!(showItem?._id)}
                />
              </>
            ) : (
              <Button
                btnText="Ok"
                bgColor="bg-[#243C7B]"
                onClick={handleClose}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ActionModal;
