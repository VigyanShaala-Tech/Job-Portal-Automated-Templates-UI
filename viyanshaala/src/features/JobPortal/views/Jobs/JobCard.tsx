import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import dayjs from "dayjs";
/* Card Component for displaying jobs to student */

interface jobSummary {
  jobID: string
  jobTitle: string;
  companyName: string;
  location: string;
  postingDate: string;
  workMode: string;
  qualifications: string;
  industry: string;
}

function JobsCard({
  jobID,
  jobTitle,
  companyName,
  location,
  postingDate,
  workMode,
  qualifications,
  industry
}: jobSummary) {


  const DateBox = styled(Box)({
    backgroundColor: "#a5cd92",
    color: "black",
    borderRadius: "28px",
    fontSize: "12px",
    padding: "5px",
    margin: "5px",
  });
  const IndustryBox = styled(Box)({
    backgroundColor: "#ffe694",
    color: "black",
    borderRadius: "28px",
    fontSize: "12px",
    padding: "5px",
    margin: "5px",
  });

  const JobIDBox = styled(Box)({
    backgroundColor: "#96a4b4",
    color: "black",
    borderRadius: "28px",
    fontSize: "12px",
    padding: "5px",
    margin: "5px",
  });

  const StyledIconButton = styled(IconButton)({
    color: '#1f324a'
  })

  return (
    <Card sx={{ minWidth: '310px', margin: "10px", width:'100%' }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
            {jobTitle}
          </Typography>
          <Box sx={{ display: "flex", minWidth:'160px' }}>
            <IndustryBox>{industry}</IndustryBox>
            <DateBox>{dayjs(postingDate).format("MMM D, YYYY")}</DateBox>
          </Box>
        </Box>
        
        <Typography sx={{ fontSize: 16 }} color="mediumpurple" component="div">
          {companyName}
        </Typography>
        <Box display="flex" alignItems="center" padding="10px">
          <LocationOnIcon sx={{ paddingRight: "5px" }} />
          <Typography variant="body2">{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" padding="10px">
          <SchoolIcon sx={{ paddingRight: "5px" }} />
          <Typography variant="body2">{qualifications}</Typography>
        </Box>
        <Box display="flex" alignItems="center" padding="10px">
          <WorkIcon sx={{ paddingRight: "5px" }} />
          <Typography variant="body2">{workMode}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{justifyContent:'space-between'}}>
      
        <Button 
        size="small" 
        color="primary"
        href = {`/JobPortal/Home/Job/${jobID}`}
        >
          VIEW
        </Button>
        
        {/* <JobIDBox><b>JOB ID: </b> {jobID}</JobIDBox> */}
        {/* uncomment the above line if you want job id to be visible */}
        
      </CardActions>
    </Card>
  );
}

export default JobsCard;
