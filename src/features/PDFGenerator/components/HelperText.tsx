import { FormHelperText, Grid } from "@mui/material";
import React from "react";

interface HelperrTextProps {
  error: any;
  minLength: number;
  maxLength: number;
  textLength: number;
}

const HelperText: React.FC<HelperrTextProps> = ({
  error,
  minLength,
  maxLength,
  textLength,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        {error && (
          <FormHelperText error sx={{ margin: "3px 14px 0" }}>
            {error?.type === "minLength"
              ? `Minimum ${minLength} characters`
              : error?.message}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={6}>
        <FormHelperText sx={{ textAlign: "right" }}>
          {textLength}/{maxLength}
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

export default HelperText;
