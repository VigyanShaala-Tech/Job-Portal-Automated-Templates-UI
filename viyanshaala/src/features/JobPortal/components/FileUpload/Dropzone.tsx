import { Box, Typography, Grid, IconButton, Tooltip } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/* component for uploading files on the apply job page
  upload button styling https://mui.com/material-ui/react-button/#file-upload
  library used- react-dropzone -https://react-dropzone.js.org/
*/

const MAX_SIZE_MB = 2; //maximum total upload size in MB
const MB_TO_BYTES = 1048576;

interface DropzoneInterface {
  files: File[];
  setFiles: any;
}

const Dropzone: React.FC<DropzoneInterface> = ({ files, setFiles }) => {
  const inputRef: any = useRef(null);
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = "";
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let size = total;
      acceptedFiles.forEach((file) => {
        size += file.size;
      });
      if (size > MAX_SIZE_MB * MB_TO_BYTES) {
        setMessage(`Cannot upload more than ${MAX_SIZE_MB} MB`);
        return;
      }
      setTotal(size);
      setMessage("");
      setFiles((current: File[]) => [
        ...current,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    },
    [total]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleRemove = (index: number, size: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setTotal((total) => total - size);
  };

  return (
    <Box>
      <Typography margin={1}>Upload the required files:</Typography>
      <Box
        {...getRootProps()}
        sx={{ height: "100%", width: "80%", borderRadius: "10px" }}
        position={"sticky"}
      >
        <input
          {...getInputProps()}
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Files
        </Button>
      </Box>
      <Grid container position={"sticky"}>
        {files.map((file, i) => (
          <Grid item xs={12} key={file.name}>
            {file.name}
            <Tooltip title="Remove file">
              <IconButton onClick={() => handleRemove(i, file.size)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      <div style={{ color: "red" }}>{message}</div>
    </Box>
  );
};

export default Dropzone;
