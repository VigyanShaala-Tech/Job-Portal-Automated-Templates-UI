import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Grid, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import PDFContent from "../../common/content";
import CancelButton from "../../components/CancelButton";
import { saveTemplateData } from "../../util/api";

interface RIASECForm {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
  hollandCode: string;
}

const RIASECEntry: React.FC = () => {
  const navigate = useNavigate();

  const {
    userState: { RIASECData, userDetails },
    dispatch,
  } = useUserContext();
  const { RIASECContent } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<RIASECForm>({
    mode: "all",
    defaultValues: RIASECData,
  });
  const onSubmit = (formValues: RIASECForm) => {
    trigger();
    const payload = { ...formValues, ...{ studentEmail: userDetails.email } };
    dispatch({
    type: "SET_RIASEC_DATA",
    payload: payload
    });
    saveTemplateData("RIASEC", payload)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/PDFGenerator/preview");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {RIASECContent.question1}
        </Typography>
        <Link
          marginLeft={2}
          href={RIASECContent.examlLink}
          target="_blank"
          variant="body1"
        >
          {RIASECContent.examlLink}
        </Link>
      </Box>
      <Box m={2}>
        <Typography variant="h6" gutterBottom>
          {RIASECContent.question2}
        </Typography>
        <Typography marginLeft={2} variant="body1" gutterBottom>
          {RIASECContent.question2a}
        </Typography>
        <TextField
          id="realistic"
          fullWidth
          label={RIASECContent.realistic}
          variant="outlined"
          error={!!errors.realistic}
          type="number"
          helperText={errors?.realistic?.message}
          {...register("realistic", {
            required: "Please enter the score for Realistic area",
          })}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="investigative"
          fullWidth
          label={RIASECContent.investigative}
          variant="outlined"
          error={!!errors.investigative}
          type="number"
          helperText={errors?.investigative?.message}
          {...register("investigative", {
            required: "Please enter the score for Investigative area",
          })}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="artistic"
          fullWidth
          label={RIASECContent.artistic}
          variant="outlined"
          error={!!errors.artistic}
          helperText={errors?.artistic?.message}
          type="number"
          {...register("artistic", {
            required: "Please enter the score for Artistic area",
          })}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="social"
          fullWidth
          label={RIASECContent.social}
          variant="outlined"
          error={!!errors.social}
          helperText={errors?.social?.message}
          type="number"
          {...register("social", {
            required: "Please enter the score for Social area",
          })}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="enterprising"
          fullWidth
          label={RIASECContent.enterprising}
          variant="outlined"
          error={!!errors.enterprising}
          helperText={errors?.enterprising?.message}
          type="number"
          {...register("enterprising", {
            required: "Please enter the score for Enterprising area",
          })}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="conventional"
          fullWidth
          label={RIASECContent.conventional}
          variant="outlined"
          type="number"
          error={!!errors.conventional}
          helperText={errors?.conventional?.message}
          {...register("conventional", {
            required: "Please enter the score for Conventional area",
          })}
        />
      </Box>
      <Box m={2}>
        <Typography variant="body1" gutterBottom>
          {RIASECContent.question2b}
        </Typography>
        <TextField
          id="hollandCode"
          fullWidth
          label="Holland Code"
          variant="outlined"
          inputProps={{ maxLength: 3 }}
          placeholder="(E.g.: REC, IAE, AEC, etc.)"
          error={!!errors.hollandCode}
          helperText={
            (errors?.hollandCode?.type === "pattern" &&
              "Please enter correct value (E.g.: REC, IAE, AEC, etc.)") ||
            errors?.hollandCode?.message
          }
          {...register("hollandCode", {
            required: "Please enter the Holland Code",
            pattern: /^(?!.*(.).*\1)[RIASEC]{3}$/i,
          })}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CancelButton />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Generate Template
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RIASECEntry;
