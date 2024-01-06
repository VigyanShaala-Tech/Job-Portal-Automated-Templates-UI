import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  FormHelperText,
} from "@mui/material";

interface MultilineTextboxProps {
  label: string;
  description: string;
  register: any;
  error: any;
  value: string;
  fieldID?: string;
  maxLength?: number;
  minLength?: number;
  isOptional?: boolean;
}

const MultilineTextbox: React.FC<MultilineTextboxProps> = ({
  label,
  description,
  register,
  error,
  value,
  fieldID,
  maxLength,
  minLength,
  isOptional,
}) => {
  const [text, setText] = useState("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      if (text === "") {
        setText("\u2022 ");
      } else {
        setText((prevText) => prevText + "\n\u2022 ");
      }
      event.preventDefault();
    }
  };
  /* React.useEffect(() => {
    handleTextChange(text);
  }, [text, handleTextChange]); */
  React.useEffect(() => {
    setText(value);
  }, []);

  return (
    <Box my={4}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label={label}
            fullWidth
            multiline
            minRows={3}
            value={text}
            variant="outlined"
            onKeyPress={(e) => {
              e.key === "Enter" && handleKeyPress(e);
            }}
            placeholder="Press Enter and start typing..."
            {...register(fieldID ? fieldID : label.toLocaleLowerCase(), {
              required: !isOptional && `Please enter the ${label}`,
              minLength: minLength,
              onChange: (event: any) => setText(event.target.value),
            })}
            error={!!error}
            inputProps={{
              maxLength: maxLength ? maxLength : 350,
              minLength: minLength ? minLength : 150,
            }}
          />
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
              <FormHelperText sx={{ textAlign: "right", marginRight: "14px" }}>
                {text.length}/{maxLength}
              </FormHelperText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MultilineTextbox;
