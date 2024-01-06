import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridColDef, GridToolbar } from "@mui/x-data-grid";
import { TransitionProps } from "@mui/material/transitions";
import { getAllPostedJobs } from "../../util/api";
import StripedDataGrid from "../../components/StripedDataGrid";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
/* Table with all the jobs posted by admin */

interface JobPosting {
  jobId: string;
  postingDate: string;
  expiryDate: string;
  isActive: string;
  company: {
    companyId: string;
    companyName: string;
  };
  jobTitle: {
    jobTitleId: string;
    jobTitle: string;
  };
  educationLevel: {
    educationLevelId: string;
    educationLevel: string;
  };
  industry: {
    industryId: string;
    industry: string;
  };
  workMode: {
    workModeId: string;
    workMode: string;
  };
  jobDescription: string;
  questionnaire: {
    questionnaireId: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
  };
  jobLocation: {
    jobLocationId: string;
    jobLocation: string;
  };
}

export default function AdminJobList() {
  useEffect(() => {
    setLinearprogress(true);
    getAllJobs();
    setLinearprogress(false);
  }, []);
  const [linearProgress, setLinearprogress] = useState(false);

  const [jobsData, setJobsData] = useState<any>([]);

  const initialJobState = {
    jobId: "",
    postingDate: "",
    expiryDate: "",
    isActive: "",
    company: {
      companyId: "",
      companyName: "",
    },
    jobTitle: {
      jobTitleId: "",
      jobTitle: "",
    },
    educationLevel: {
      educationLevelId: "",
      educationLevel: "",
    },
    industry: {
      industryId: "",
      industry: "",
    },
    workMode: {
      workModeId: "",
      workMode: "",
    },
    jobDescription: "",
    questionnaire: {
      questionnaireId: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
    },
    jobLocation: {
      jobLocationId: "",
      jobLocation: "",
    },
  };
  const [job, setJob] = useState<JobPosting>(initialJobState);
  const getAllJobs = async () => {
    getAllPostedJobs().then((response: any) => {
      setJobsData(response.data.data);
    });
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const columns: GridColDef[] = [
    {
      field: "jobId",
      headerName: "Job ID",
      headerClassName: "super-app-theme--header",
      minWidth: 320,
      flex:3.2
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      headerClassName: "super-app-theme--header",
      minWidth: 170,
      valueGetter: (params) => params.row.jobTitle.jobTitle,
      flex: 1.7,
    },
    {
      field: "companyName",
      headerName: "Company",
      headerClassName: "super-app-theme--header",
      minWidth: 170,
      valueGetter: (params) => params.row.company.companyName,
      flex: 1.7,
    },
    {
      field: "jobLocation",
      headerName: "Location",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      valueGetter: (params) => params.row.jobLocation.jobLocation,
      flex: 1,
    },
    {
      field: "postingDate",
      headerName: "Posting Date",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      flex: 1.5,
      sortable: false,

      renderCell: (params) => {
        const onClick = () => {
          const currentRow = params.row;
          setJob(currentRow);
        };

        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="View">
              <IconButton
                color="inherit"
                size="small"
                href={`/JobPortal/ManageJobs/Job/${params.row.jobId}`}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
            <Link to={`/JobPortal/ManageJobs/Job/${params.row.jobId}/Edit`} state={{edit:params.row}}>
              <IconButton color="inherit" size="small">
                <EditIcon />
              </IconButton>
              </Link>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box padding={3}>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"baseline"}
      >
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4"> Job Postings:</Typography>
          <Tooltip title="New Job">
            <Link to='/JobPortal/ManageJobs/New' state={{edit:initialJobState}}>
            <IconButton            
              sx={{
                borderRadius: "50%",
                backgroundColor: "#69ab4a",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#96c480",
                },
              }}
            >
              <AddIcon color="inherit" />
            </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid item xs={12} margin={3}>
          <div style={{ flexDirection:'column', width:'100%',}}>
            <StripedDataGrid
              sx={{
                "& .super-app-theme--header": {
                  backgroundColor: "#2c4869",
                  color: "#FFFFFF",
                  fontStyle: "bold",
                  width:'100%',
                  "&.MuiDataGrid-root .MuiDataGrid-cell": {
                    whiteSpace: "normal !important",
                    wordWrap: "break-word !important",
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
              pageSizeOptions={[100,50]}
              rows={jobsData}
              getRowId={(row) => row.jobId}
              columns={columns}
              rowSelection={false}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              getRowHeight={() => "auto"}
            />
          </div>
          <ProgressBar show={linearProgress} />
        </Grid>
        
      </Grid>
    </Box>
  );
}
