import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { StyledButton } from "../../components/StyledButton";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../components/FormComponents/Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getLocationList,
  getCompanyList,
  getTitleList,
  getIndustryList,
  getQualificationsList,
  getWorkModeList,
  saveJobData,
  updateJobData,
} from "../../util/api";
import dayjs, { Dayjs } from "dayjs";
/* post and edit job page*/
interface LocationList {
  jobLocationId: string;
  jobLocation: string;
}

interface JobTitleList {
  jobTitleId: string;
  jobTitle: string;
}
interface CompanyList {
  companyId: string;
  companyName: string;
}
interface IndustryList {
  industryId: string;
  industry: string;
}
interface WorkModeList {
  workModeId: string;
  workMode: string;
}
interface EducationLevelList {
  educationLevelId: string;
  educationLevel: string;
}
interface JobPosting {
  postingDate: string;
  expiryDate: string;
  isActive:string;
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
  hrEmail: string;
  questionnaire: {
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

interface EditJob {
  editing: boolean;
  editJob?: any;
}

const PostJob: React.FC<EditJob> = ({ editing }) => {
  
  const [locationMenuItems, setLocationMenuItems] = useState<LocationList[]>(
    []
  );
  const [titleMenuItems, setTitleMenuItems] = useState<JobTitleList[]>([]);
  const [companyMenuItems, setCompanyMenuItems] = useState<CompanyList[]>([]);
  const [industryMenuItems, setIndustryMenuItems] = useState<IndustryList[]>(
    []
  );
  const [workModeMenuItems, setWorkModeMenuItems] = useState<WorkModeList[]>(
    []
  );
  const [educationMenuItems, setEducationMenuItems] = useState<
    EducationLevelList[]
  >([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertSeverity, setAlterSeverity] = useState("info");

  //load all dropdown fields on page load

  useEffect(() => {
    getLocationData();
    getJobTitleData();
    getCompanyData();
    getIndustryData();
    getWorkModeData();
    getEducationData();
    
  }, []);
      const location = useLocation();
      const {edit} = location.state;     
    const initialJobPosting = editing?edit: {
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
      hrEmail: "",
      questionnaire: {
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
  
  const [job, setJob] = useState<JobPosting>(initialJobPosting);
  
  const getLocationData = async () => {
    getLocationList().then((response: any) => {
      setLocationMenuItems(response.data.data);
    });
  };
  const getJobTitleData = async () => {
    getTitleList().then((response: any) => {
      setTitleMenuItems(response.data.data);
    });
  };
  const getCompanyData = async () => {
    getCompanyList().then((response: any) => {
      setCompanyMenuItems(response.data.data);
    });
  };
  const getIndustryData = async () => {
    getIndustryList().then((response: any) => {
      setIndustryMenuItems(response.data.data);
    });
  };
  const getWorkModeData = async () => {
    getWorkModeList().then((response: any) => {
      setWorkModeMenuItems(response.data.data);
    });
  };
  const getEducationData = async () => {
    getQualificationsList().then((response: any) => {
      setEducationMenuItems(response.data.data);
    });
  };

  const navigate = useNavigate();

  

  //for form validation
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<JobPosting>({
    mode: "all",
    defaultValues: job,
  });

  const postJob = async () => {
    trigger();
    if (editing === true) {
      updateJobData(job)
        .then(function (response) {
          setMessage(response.data.statusMessage);
          setShowAlert(true);
          setAlterSeverity("success");
        })
        .catch(function (error) {
          console.log(error);
        });
      setJob(initialJobPosting);
    } else {
      saveJobData(job)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setJob(initialJobPosting);
      navigate("/JobPortal/ManageJobs");
    }
  };

  function HandleDescription(text: string): void {
    setJob({
      ...job,
      jobDescription: text,
    });
  }

  function handleEmail(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setJob({
      ...job,
      hrEmail: event.target.value as string,
    });
  }

  function handleIsActive(event: SelectChangeEvent): void {
    setJob({
      ...job,
      isActive: event.target.value as string,
    });
  }

  function handleExpiryDate(newDate:null|Dayjs): void {
    if(newDate!==null){
    setJob({
      ...job,
      expiryDate: newDate.format('YYYY-MM-DD'),
    });}
    else return;
  }

  function handleQuestionnaire(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setJob({
      ...job,
      questionnaire: {
        ...job.questionnaire,
        [event.target.id]: event.target.value as string,
      },
    });
  }
  

  return (
    <form onSubmit={handleSubmit(postJob)}>
      <Box padding={5}>
        {editing ? (
          <Typography variant="h5" marginBottom={5}>Edit Job:</Typography>
        ) : (
          <Typography variant="h5" marginBottom={5}>Post A New Job:</Typography>
        )}

        <div>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-company-name-required"
                label="Company Name"
                register={register}
                error={errors.company}
                fieldTitle="company"
                fieldId="companyId"
                fieldName="companyName"
                control={control}
                menuItems={companyMenuItems}
                job={job}
                setJob={setJob}
                value={job.company}
                required={true}
              />
              {errors.company && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.company.message}
                  </Typography>
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-location-label"
                label="Location"
                register={register}
                error={!!errors.jobLocation}
                fieldTitle="jobLocation"
                fieldId="jobLocationId"
                fieldName="jobLocation"
                control={control}
                menuItems={locationMenuItems}
                job={job}
                setJob={setJob}
                value={job.jobLocation}
                required={true}
              />
              {errors.jobLocation && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.jobLocation.message}
                  </Typography>
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-job-title-label"
                label="Job Title"
                register={register}
                error={!!errors.jobTitle}
                fieldTitle="jobTitle"
                fieldId="jobTitleId"
                fieldName="jobTitle"
                control={control}
                menuItems={titleMenuItems}
                job={job}
                setJob={setJob}
                value={job.jobTitle}
                required={true}
              />
              {errors.jobTitle && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.jobTitle.message}
                  </Typography>
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-industry-label"
                label="Industry"
                register={register}
                error={!!errors.industry}
                fieldTitle="industry"
                fieldId="industryId"
                fieldName="industry"
                control={control}
                menuItems={industryMenuItems}
                job={job}
                setJob={setJob}
                value={job.industry}
                required={true}
              />
              {errors.industry && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.industry.message}
                  </Typography>
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-work-mode-label"
                label="Work Mode"
                register={register}
                error={!!errors.workMode}
                fieldTitle="workMode"
                fieldId="workModeId"
                fieldName="workMode"
                control={control}
                menuItems={workModeMenuItems}
                job={job}
                setJob={setJob}
                value={job.workMode}
                required={true}
              />
              {errors.workMode && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.workMode.message}
                  </Typography>
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Dropdown
                labelId="select-education-level-label"
                label="Education Level"
                register={register}
                error={!!errors.educationLevel}
                fieldTitle="educationLevel"
                fieldId="educationLevelId"
                fieldName="educationLevel"
                control={control}
                menuItems={educationMenuItems}
                job={job}
                setJob={setJob}
                value={job.educationLevel}
                required={true}
              />
              {errors.educationLevel && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.educationLevel.message}
                  </Typography>
                </span>
              )}
            </Grid>
            {editing&&<> <Grid item xs={12} md={6} lg={4}>
            <FormControl sx={{width:'65%'}}>
              <InputLabel id="select-isActive">
                Active *
              </InputLabel>
              <Select
                labelId="select-isActive-label"
                id="select-is-active-required"
                label="Active"
                name="isActive"
                onChange={handleIsActive}
                defaultValue={job.isActive}
              >
                {["Y","N"].map((active) => (
                  <MenuItem
                    value={active}
                  >
                    {active}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
        label="Expiry Date"
        value={dayjs(job.expiryDate)}
        onChange={(newValue) => handleExpiryDate(newValue)}
       />
      
    </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} lg={4} ></Grid></>}
            <Grid item xs={12} >    
              <ReactQuill
                placeholder="Job Description"
                theme="snow"
                value={job.jobDescription}
                onChange={(e) => HandleDescription(e)}
              />        
            </Grid>
            <Grid item xs={12} md={6} >
              <TextField
                id="hrEmail"
                inputProps={{
                  autoComplete: "off",
                }}
                error={!!errors.hrEmail}
                {...register("hrEmail", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email ID",
                  },
                })}
                onChange={handleEmail}
                label="HR email *"
                fullWidth
              />
              {errors.hrEmail && (
                <span role="alert">
                  <Typography color="error" variant="caption">
                    {errors.hrEmail.message}
                  </Typography>
                </span>
              )}
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="question1"
                label="Question 1"
                value={job.questionnaire.question1}
                onChange={handleQuestionnaire}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="question2"
                label="Question 2"
                value={job.questionnaire.question2}
                onChange={handleQuestionnaire}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="question3"
                label="Question 3"
                value={job.questionnaire.question3}
                onChange={handleQuestionnaire}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="question4"
                label="Question 4"
                value={job.questionnaire.question4}
                onChange={handleQuestionnaire}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                id="question5"
                label="Question 5"
                value={job.questionnaire.question5}
                onChange={handleQuestionnaire}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          {showAlert ? (
            <Alert
              action={
                <Button href="/JobPortal/ManageJobs">OK</Button>
              }
              sx={{ mb: 2 }}
            >
              Job updated Successfully!
            </Alert>
          ) : (
            <Grid item xs={12} >
              <StyledButton sx={{ margin: "10px" }} type="submit">
                Post Now
              </StyledButton>
              <StyledButton href="/JobPortal/ManageJobs">Cancel</StyledButton>
            </Grid>
          )}
        </div>
      </Box>
    </form>
  );
};

export default PostJob;
