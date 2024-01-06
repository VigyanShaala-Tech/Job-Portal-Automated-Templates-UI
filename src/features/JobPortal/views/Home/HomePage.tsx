import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import JobsCard from "../Jobs/JobCard";
import { getTitleList, getLocationList, getCompanyList, getIndustryList, getQualificationsList, getWorkModeList, getActivePostedJobs, searchJobs } from "../../util/api";
import ProgressBar from "../../components/ProgressBar";
import { StyledButton } from "../../components/StyledButton";
import FilterDropdown from "../../components/FormComponents/FilterDropbox";
/* 
Student Home Page for job portal
*/

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

interface JobFilter {
  location: string;
  company: string;
  jobTitle: string;
  fromDate: string;
  workMode: string;
  educationLevel: string;
  industry: string;
}

const HomePage: React.FC = () => {

  const [locationMenuItems, setLocationMenuItems] = useState<LocationList[]>([]);
  const [titleMenuItems, setTitleMenuItems] = useState<JobTitleList[]>([]);
  const [companyMenuItems, setCompanyMenuItems] = useState<CompanyList[]>([]);
  const [industryMenuItems, setIndustryMenuItems] = useState<IndustryList[]>([]);
  const [workModeMenuItems, setWorkModeMenuItems] = useState<WorkModeList[]>([]);
  const [educationMenuItems, setEducationMenuItems] = useState<EducationLevelList[]>([]);
  const [pages, setPages]=useState(1);
  const [pageNumber, setPageNumber] = useState(0);

  const initialFilterValue = {
    location: "",
    company: "",
    jobTitle: "",
    fromDate: "",
    workMode: "",
    educationLevel: "",
    industry: "",
  }

  const [jobFilter, setjobFilter] = useState<JobFilter>(initialFilterValue);
  const [linearProgress, setLinearprogress] = useState(false);

  useEffect(() => {
    getLocationData();
    getJobTitleData();
    getCompanyData();
    getIndustryData();
    getWorkModeData();
    getEducationData();
    // getJobsData();
  }, []);

  useEffect(()=>{
    if(jobFilter==initialFilterValue){
      getJobsData();
    }
    else{
      handleSearch(pageNumber);
    }
    
  },[pageNumber])

  const [jobsData, setJobsData] = useState<any>([]);

  const getJobsData = async () => {
    setLinearprogress(true);
    try{
      getActivePostedJobs(pageNumber).then((response:any)=>{
        setJobsData(response.data.data.content);
        setPages(response.data.pages);
      });
    }catch(e){
      console.log(e);
    }    
    
    setLinearprogress(false);
    
  };

  const getLocationData = async () => {
    getLocationList().then((response:any)=>{
      setLocationMenuItems(response.data.data);
    });
    
  };
  const getJobTitleData = async () => {
    getTitleList().then((response:any)=>{
      setTitleMenuItems(response.data.data);
    });
    
  };
  const getCompanyData = async () => {
    getCompanyList().then((response:any)=>{
      setCompanyMenuItems(response.data.data);
    });
    
  };
  const getIndustryData = async () => {
    getIndustryList().then((response:any)=>{
      setIndustryMenuItems(response.data.data);
    });
    
  };
  const getWorkModeData = async () => {
    getWorkModeList().then((response:any)=>{
      setWorkModeMenuItems(response.data.data);
    });
    
  };
  const getEducationData = async () => {
    getQualificationsList().then((response:any)=>{
      setEducationMenuItems(response.data.data);
    });
    
  };

  const handleSearch = async(pn:number)=>{
    setLinearprogress(true);
    setPageNumber(pn)
    searchJobs({params:jobFilter}, pn)
      .then(function (response) {
        if(response.status===200 && response.data.data!=null){
          setJobsData(response.data.data.content);
          setPages(response.data.pages);
        }
        else{
          setJobsData(null);
        }
        
      })
      .catch(function (error) {
        console.log(error);
        setJobsData([]);
      }); 
      setLinearprogress(false);
  }

  const handleClear=()=>{
    setLinearprogress(true);
    setjobFilter(initialFilterValue);
    setPageNumber(0);
    getJobsData();
    setLinearprogress(false);
  }
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value-1);
  };

  return (
    <>
      <Box bgcolor="#F5FBF0" width="100%" display={"flex"}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          paddingTop={10}
          paddingBottom={10}
        >
          <Grid
            item
            key='companyFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Company Name"
              fieldTitle="company"
              fieldId="companyId"
              fieldName="companyName"
              menuItems={companyMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.company}
            />
          </Grid>
          <Grid
            item
            key='locationFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Location"
              fieldTitle="location"
              fieldId="jobLocationId"
              fieldName="jobLocation"
              menuItems={locationMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.location}
            />
          </Grid>
          <Grid
            item
            key='titleFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Job Title"
              fieldTitle="jobTitle"
              fieldId="jobTitleId"
              fieldName="jobTitle"
              menuItems={titleMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.jobTitle}
            />
          </Grid>
          <Grid
            item
            key='industryFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Industry"
              fieldTitle="industry"
              fieldId="industryId"
              fieldName="industry"
              menuItems={industryMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.industry}
            />
          </Grid>
          <Grid
            item
            key='workmodeFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Work Mode"
              fieldTitle="workMode"
              fieldId="workModeId"
              fieldName="workMode"
              menuItems={workModeMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.workMode}
            />            
          </Grid>
          <Grid
            item
            key='qualificationsFilter'
            xs={12}
            md={2}
            padding={1}
            display={"flex"}
            justifyContent={"center"}
          >
            <FilterDropdown 
              label="Qualifications"
              fieldTitle="educationLevel"
              fieldId="educationLevelId"
              fieldName="educationLevel"
              menuItems={educationMenuItems}
              jobFilter={jobFilter}
              setJobFilter={setjobFilter}
              value={jobFilter.educationLevel}
            />   
          </Grid>
          <Grid
            item
            key='buttons'
            xs={12}
            alignContent={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <StyledButton
              onClick={()=>handleSearch(0)}
              sx={{margin:'10px'}}
            >
              Search
            </StyledButton>
            <StyledButton
              onClick={handleClear}
              sx={{margin:'10px'}}
            >
              Clear Filters
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
      <Grid item>{linearProgress && <LinearProgress />}</Grid>
      
      <Box marginLeft={'1vw'} marginRight={'1vw'}>
      {jobsData.length>0?
      <>
      <Grid container>          
      {jobsData.map((job: any) => (
      
        <Grid item xs={12} sm={6} md={4} display={'flex'}>
          <JobsCard
            jobID={job.jobId}
            jobTitle={job.jobTitle.jobTitle}
            companyName={job.company.companyName}
            location={job.jobLocation.jobLocation}
            postingDate={job.postingDate}
            qualifications={job.educationLevel.educationLevel}
            workMode={job.workMode.workMode}
            industry={job.industry.industry}
          />
        </Grid>
      ))}
      
    </Grid>
    <Box alignContent={'center'} display={'flex'} justifyContent={'center'}>
    <Pagination 
      count={pages}
      page={pageNumber+1}
      color='primary' 
      variant='outlined'
      showFirstButton
      showLastButton
      onChange={handlePageChange}
      />
    </Box>
    </>
    :
    <Box sx={{display:"flex", justifyContent: "center", paddingTop:"20px", margin:"10px"}}>No Jobs To Display</Box>
    }
    
    
        
      </Box>
    </>
  );
};

export default HomePage;
