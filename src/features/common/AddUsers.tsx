import { Alert, Box,IconButton, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { uploadUsersCsv } from "../JobPortal/util/api";
import { StyledButton } from "../JobPortal/components/StyledButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddUsers: React.FC = () => {
  const [usersCsv, setUsersCsv] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const inputRef: any = useRef(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setOpen(false);
    if (event.target.files[0]?.type === "text/csv") {
      setUsersCsv(event.target.files[0]);
      setMessage("");
      event.target.value='';
    } else {
      setOpen(true);
      setMessage("Please upload a csv format file.");
      setUsersCsv(undefined);
    }
  };
  console.log(usersCsv);

  async function upload() {
    setOpen(false);
    if (!usersCsv) {
      setOpen(true);
      setMessage("No file selected.");
      return;
    }
    let formData = new FormData();

    formData.append("file", usersCsv);

    uploadUsersCsv(formData)
      .then((response) => {
        setUsersCsv(undefined);
        setMessage(response.data.statusMessage);
        
      })
      .catch((err) => {
        setUsersCsv(undefined);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not Add Users!");
        }
        
      });
    setOpen(true);
  }

  return (
    <Box margin={5}>
      <Stack margin={2}>
        <Typography variant="h5">Upload a csv to add users:</Typography>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            ref={inputRef}
            onChange={(e) => handleChange(e)}
          />
        </Button>
        <StyledButton onClick={upload}>Add Users</StyledButton>
      </Stack>
      <Stack>
        <Box>
          <Typography>{usersCsv?.name}</Typography>
        </Box>
      </Stack>
      <Stack margin={2}>
        {open && (
          <Box>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AddUsers;
