import { Box, Stack, Typography } from "@mui/material";

interface ModalHeaderProps {
  title: string;
  step: number;
  totalSteps: number;
}

const ModalHeader = ({
  title,
  step,
  totalSteps,
}: ModalHeaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "6px",
        flexDirection: "column",
        mb: "24px",
      }}
    >
      <Box
        sx={{
          mb: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={"span"}
          fontWeight={"600"}
          fontSize={"28px"}
          lineHeight={"36px"}
          letterSpacing={"0%"}
        >
          {title}
        </Typography>
        <Typography
          component={"span"}
          fontWeight={"600"}
          fontSize={"28px"}
          lineHeight={"36px"}
          letterSpacing={"0%"}
          color="#333232"
        >
          {step}/{totalSteps}
        </Typography>
      </Box>

      <Stack flexDirection={"row"} gap={"6px"}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= step;
          return (
            <Box
              key={stepNumber}
              sx={{
                height: "4px",
                maxWidth: "324px",
                width: "100%",
                backgroundColor: isActive ? "#243C7B" : "#E0E7FA",
                borderRadius: "6px",
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ModalHeader;
