import { Alert, AppBar, Box, Dialog, Grid, Paper, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, {  ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DomainIcon from "@mui/icons-material/Domain";
import {StyledButton} from "../../components/StyledButton";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import BadgeIcon from '@mui/icons-material/Badge';
import styled from "styled-components";
import PostJob from "../PostJob/PostJob";
import parse from 'html-react-parser';
import { getJobById } from "../../util/api";
import { useUserContext } from "../../../PDFGenerator/contexts/UserContext";
/*Job Detail View Page */

interface JobPosting {
  jobId: string;
  postingDate: string;
  expiryDate: string;
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


function JobDetailsView() {
  const[open,setopen] = useState(false);
  const initialJobState={
    jobId: "",
    postingDate: "",
    expiryDate: "",
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
  }
  const [job, setJob] = useState<JobPosting>(initialJobState);

  const {
    userState: { userDetails },
  } = useUserContext(); 

  const location = useLocation();
  useEffect(() => {
    let id = location.pathname.split("/").reverse()[0];
    fetchJobById(id);
  }, [location.pathname]);

  const fetchJobById = async (id: string) => {
    getJobById(id).then((response:any)=>{
      setJob(response.data.data);
    })
    
  };

  const JobIDBox = styled(Box)({
    backgroundColor: "#96a4b4",
    color: "black",
    borderRadius: "28px",
    fontSize: "12px",
    padding: "5px",
    margin: "5px",
  });

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

    return (
    <Box padding={5}>
      <Paper
        elevation={3}
        sx={{ padding: 5, margin: 2, backgroundColor: "#e6ebe4" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" color={'#00396b'}>{job.jobTitle.jobTitle} </Typography>
          {sessionStorage.getItem("role")?.toLowerCase()==='admin' ?(<Link to={`/JobPortal/ManageJobs/Job/${job.jobId}/Edit`} state={{edit:job}}><StyledButton >EDIT</StyledButton></Link>):<StyledButton href={`${job.jobId}/Apply`} >APPLY</StyledButton>}
        </Box>
        <Grid container display="flex" margin={'0 10% 0 0'}>
          <Grid item xs={12} md={3} display="flex">
            <BadgeIcon sx={{margin:1}} />
            <Box padding="10px" alignItems="center">
            <Typography variant="body1" fontWeight={'bold'}>Company Name:</Typography>
            <Typography variant="body1" >{job.company.companyName}</Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <LocationOnIcon sx={{margin:1}}/>
          <Box padding="10px"  alignItems="center">            
            <Typography variant="body1" fontWeight={'bold'}>Location:</Typography>
            <Typography variant="body1">
              {job.jobLocation.jobLocation}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <WorkIcon sx={{margin:1}}/>
          <Box padding="10px" alignItems="center">
          <Typography variant="body1" fontWeight={'bold'}>Work Mode:</Typography>
            <Typography variant="body1" >
              {job.workMode.workMode}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <SchoolIcon sx={{margin:1}}/>
          <Box padding="10px"  alignItems="center">
          <Typography variant="body1" fontWeight={'bold'}>Qualifications:</Typography>
            <Typography variant="body1" >{job.educationLevel.educationLevel}</Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <AccessTimeIcon sx={{margin:1}} />
          <Box padding="10px"  alignItems="center">
          <Typography variant="body1" fontWeight={'bold'}>Posting Date:</Typography>
            <Typography variant="body1" >
              {dayjs(job.postingDate).format("MMM D, YYYY")}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <AccessTimeIcon sx={{margin:1}} />
          <Box padding="10px"  alignItems="center">
          <Typography variant="body1" fontWeight={'bold'}>Expiry Date:</Typography>
            <Typography variant="body1" >
              {dayjs(job.expiryDate).format("MMM D, YYYY")}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <DomainIcon sx={{margin:1}}/>
          <Box padding="10px"  alignItems="center">
          <Typography variant="body1" fontWeight={'bold'}>Industry:</Typography>
            <Typography variant="body1" >
              {job.industry.industry}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12} md={3} display="flex">
          <Box padding="10px"  alignItems="center">
          {/* <Typography variant="body1" fontWeight={'bold'}>Job ID:</Typography>
            <JobIDBox>{job.jobId}</JobIDBox> */}
            {/* uncomment above line to make jobID visible to students */}
          </Box>
          </Grid>
        </Grid>
        
        
      </Paper>
      <Typography variant="h5">Job Description:</Typography>
      <Box
        display="flex"
        alignItems="left"
        padding="10px"
        bgcolor="#f5f9fd"
        marginBottom={'2vh'}
      >
        <Typography variant="body2">{parse(job.jobDescription)}</Typography>
      </Box>
    
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#00396b" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Job - {job.jobTitle.jobTitle}, {job.company.companyName}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              href = {`/JobPortal/ManageJobs/Job/${job.jobId}`}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <PostJob editing={true} editJob={job}/>
      </Dialog>
    </Box>
  );
}

export default JobDetailsView;
