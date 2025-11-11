import CancelIcon from "../../assets/icons/CancelIcon";
import Button from "../Button";

const CancelButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Button
      icon={<CancelIcon width="13px" height="13px" fill="#2D2D2D" />}
      iconPosition="right"
      bgColor="transparent"
      onClick={handleClose}
    />
  );
};

export default CancelButton;
