import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import StripedDataGrid from "./StripedDataGrid";
import { GridColDef } from "@mui/x-data-grid";
/*
reusable component for adding new company, location, title, work mode, qualifications
*/

interface LookupInterface {
  value: string;
  onChange: (params: any) => any;
  addField: (params: any) => any;
  fieldItems: any;
  fieldName: string;
  fieldId: string;
  heading: string;
  message: string;
  tableTitle:string;
}

const LookupTable: React.FC<LookupInterface> = ({
  value,
  onChange,
  addField,
  fieldItems,
  fieldName,
  fieldId,
  heading,
  message,
  tableTitle
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const columns: GridColDef[] = [
    {
      field: fieldName,
      headerName: tableTitle,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      valueGetter: (params) => params.row[fieldName],
      flex: 2,
    },]
  
  return (
    <Box padding={'5vw'}>
      <Grid container >
        <Grid item xs={12}>
          <Typography variant="h5">Add {heading}</Typography>
        </Grid>
        <Grid item xs={12} md={3} display={'flex'} marginBottom={'2vh'}>
          <TextField
          autoFocus
          value={value}
          sx={{marginRight:'8px'}}
          onChange={onChange}
          margin="dense"
          id="name"
          fullWidth
          variant="standard"
          inputProps={{
            autoComplete: "off",
          }}
        />        
        <IconButton
          sx={{
            borderRadius: "50%",
            backgroundColor: "#69ab4a",
            marginRight: "10px",
            "&:hover":{
              backgroundColor: "#96c480",
            }
          }}
          onClick={addField}>
            <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
      <Box height={'350px'}>
      <div style={{ width: "100%", height:350 }}>
            <StripedDataGrid
              sx={{
                "& .super-app-theme--header": {
                  backgroundColor: "#2c4869",
                  color: "#FFFFFF",
                  display: "flex",
                  fontStyle: "bold",
                  "&:hover, &.Mui-hovered": { color: "#FFFFFF" },
                  "&.MuiDataGrid-root .MuiDataGrid-cell": {
                    whiteSpace: "normal !important",
                    wordWrap: "break-word !important",
                  },
                },
              }}
              rows={fieldItems}
              getRowId={(row) => row[fieldId]}
              columns={columns}
              rowSelection={false}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </div>
      </Box>
      {(message.length>0 && open) && <Box sx={{ width: '100%' }}>
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
    </Box>}
      </Grid>
      </Grid>
      
      
    </Box>
  );
};

export default LookupTable;
