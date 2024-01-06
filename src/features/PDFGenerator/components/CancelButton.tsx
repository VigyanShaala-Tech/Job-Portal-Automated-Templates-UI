import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CancelButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => navigate("/PDFGenerator/dashboard")}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
