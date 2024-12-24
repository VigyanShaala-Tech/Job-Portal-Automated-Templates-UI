import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledButton } from "../../components/StyledButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Dropzone from "../../components/FileUpload/Dropzone";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { getJobById, savejobApplication } from "../../util/api";
/*
Apply job page for student
*/
interface jobApplication {
  fullName: string;
  email: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
}
interface applyJob {
  setMessage: (params: any) => any;
  setAlertseverity: (params: any) => any;
  setShowAlert: (params: any) => any;
  setClose: () => any;
  job: any;
}

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

const ApplyJob: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]); //uploaded files
  const [jobApplication, setJobApplication] = useState<jobApplication>({
    fullName: "",
    email: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [job, setJob] = useState<JobPosting>({
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
  });

  const [message, setMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

   const handleClose = () => {
    setOpen(false);
    navigate(`/JobPortal/Home/Job/${job.jobId}`);
  };

  const location = useLocation(); //https://reactrouter.com/en/main/hooks/use-location

  //fetch the job for with the student is applying
  useEffect(() => {
    let id = location.pathname.split("/").reverse()[1];//getting id from url
    fetchJobById(id);
  }, [location.pathname]);

  const navigate = useNavigate(); //https://reactrouter.com/en/main/hooks/use-navigate

  const fetchJobById = async (id: string) => {
    getJobById(id).then((response: any) => {
      setJob(response.data.data);
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<jobApplication>({
    mode: "all",
  });

  //on change in text box
  function handleTextChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setJobApplication({
      ...jobApplication,
      [event.target.name]: event.target.value as string,
    });
  }

  //on apply button click
  async function handleApply() {
    if (files.length === 0) {
      setShowAlert(true);
      return;
    }
    trigger();
    const form = new FormData();
    let res = {
      studentId: sessionStorage.getItem("studentID"),
      job: job,
      jobId: job.jobId,
      answer1: jobApplication.question1,
      answer2: jobApplication.question2,
      answer3: jobApplication.question3,
      answer4: jobApplication.question4,
      answer5: jobApplication.question5,
      isJobApplicationPostedToHr: false,
      studentName: jobApplication.fullName,
      studentEmail: jobApplication.email,
    };
    form.append("jobApplication", JSON.stringify(res));
    files.map((file) => {
      form.append("files", file);
    });
    savejobApplication(form)
      .then(function (response) {
        setMessage(response.data.statusMessage);
        setShowAlert(true);
        setOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div autoFocus>
      <AppBar sx={{ position: "static", backgroundColor: "#00396b" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Apply For This Job - {job.jobTitle.jobTitle},{" "}
            {job.company.companyName}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(handleApply)}>
        <Grid container paddingLeft={"5%"} paddingRight={"5%"}>
          <Grid item xs={12} md={5} margin={2}>
            <TextField
              fullWidth
              id="fullName"
              placeholder="Enter Full Name"
              label="Full Name"
              variant="outlined"
              error={!!errors.fullName}
              {...register("fullName", {
                required: "Required",
              })}
              helperText={errors.fullName && "Please enter your full name."}
              onChange={handleTextChange}
            />
          </Grid>

          <Grid item xs={12} md={5} margin={2}>
            <TextField
              fullWidth
              id="emailID"
              placeholder="Enter Email ID"
              label="Email ID"
              variant="outlined"
              error={!!errors.email}
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Entered value does not match email format",
                },
              })}
              helperText={errors.email && errors.email.message}
              onChange={handleTextChange}
            />
  
          </Grid>
          {Object.keys(job.questionnaire).filter((k) => {
            return (
              job.questionnaire[k as keyof JobPosting["questionnaire"]] === ""
            );
          }).length < 5 && (
            <Grid item xs={12} margin={2}>
              <Typography>Answer the Following Questions:</Typography>
            </Grid>
          )}

          {Object.entries(job.questionnaire)
            .slice(1)
            .map((question: any) => {
              if (question[1] !== "") {
                return (
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      marginLeft={2}
                      marginRight={2}
                      display={"flex"}
                      justifyContent={"left"}
                      alignItems={"center"}
                    >
                      {question[1]}
                    </Grid>
                    <Grid item xs={12} margin={2}>
                      <TextField
                        name={question[0]}
                        fullWidth
                        placeholder="Answer here"
                        multiline
                        rows={2}
                        onChange={handleTextChange}
                      />
                    </Grid>
                  </Grid>
                );
              }
              return <></>;
            })}
          <Grid item xs={12} margin={2}>
            <Dropzone files={files} setFiles={setFiles} />
            {showAlert && files.length === 0 && (
              <Typography color={"red"}>No files uploaded</Typography>
            )}
          </Grid>
          <Grid item xs={12} margin={2}>
            <StyledButton type="submit" sx={{ margin: 1 }}>
              Apply Now
            </StyledButton>
            <StyledButton
              onClick={() => {
                navigate(`/JobPortal/Home/Job/${job.jobId}`);
              }}
            >
              Cancel
            </StyledButton>
          </Grid>
        </Grid>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplyJob;
