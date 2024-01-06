import React from "react";
import { useNavigate } from "react-router-dom";
import MultilLineTextBox from "../../components/MultilLineTextBox/MultilLineTextBox";
import { Box, TextField,Typography, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import CancelButton from "../../components/CancelButton";
import { saveTemplateData } from "../../util/api";
import PDFContent from "../../common/content";

// An interface in TypeScript is a way to define the shape of an object.
// specifies the names and types of the properties that an object of this type should have.

interface SMARTGOALSForm {
  goal: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}


const SMARTGOALSEntry: React.FC = () => {
  const navigate = useNavigate();

  const {
    userState: { SMARTGOALSData, userDetails },
    dispatch,
  } = useUserContext();
  const { SMARTGOALSContent } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<SMARTGOALSForm>({
    defaultValues: SMARTGOALSData,
    mode: "all",
  });
  const onSubmit = (formValues: SMARTGOALSForm) => {
    trigger();
    const payload = { ...formValues, ...{ studentEmail: userDetails.email } };
    dispatch({ type: "SET_SMART_GOALS_DATA",
     payload: payload
     });

    saveTemplateData("SMARTGOALS", payload)
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
      <Box my={2}>
        <TextField
          id="goal"
          fullWidth
          label={SMARTGOALSContent.goal}
          variant="outlined"
          error={!!errors.goal}
          helperText={errors?.goal?.message}
          {...register("goal", {
            required: "Please enter the goal",
          })}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {SMARTGOALSContent.Specific_description}
        </Typography>
        <TextField
          id="specific"
          fullWidth
          multiline
          label={SMARTGOALSContent.Specific}
          variant="outlined"
          error={!!errors.specific}
          inputProps={{ minLength: 50, maxLength: 200 }}
          helperText={
            (errors?.specific?.type === "minLength" && "Should be longer") ||
            errors?.specific?.message
          }
          {...register("specific", {
            required: "Please enter your answer",
            minLength: 50,
          })}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {SMARTGOALSContent.Measurable_description}
        </Typography>
        <TextField
          id="measurable"
          fullWidth
          multiline
          label={SMARTGOALSContent.Measurable}
          variant="outlined"
          error={!!errors.measurable}
          inputProps={{ minLength: 50, maxLength: 200 }}
          helperText={
            (errors?.measurable?.type === "minLength" && "Should be longer") ||
            errors?.measurable?.message
          }
          {...register("measurable", {
            required: "Please enter your answer",
            minLength: 50,
          })}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {SMARTGOALSContent.Achievable_description}
        </Typography>
        <TextField
          id="achievable"
          fullWidth
          multiline
          label={SMARTGOALSContent.Achievable}
          variant="outlined"
          error={!!errors.achievable}
          inputProps={{ minLength: 50, maxLength: 200 }}
          helperText={
            (errors?.achievable?.type === "minLength" && "Should be longer") ||
            errors?.achievable?.message
          }
          {...register("achievable", {
            required: "Please enter your answer",
            minLength: 50,
          })}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {SMARTGOALSContent.Relevant_description}
        </Typography>
        <TextField
          id="relevant"
          fullWidth
          multiline
          label={SMARTGOALSContent.Relevant}
          variant="outlined"
          error={!!errors.relevant}
          inputProps={{ minLength: 50, maxLength: 200 }}
          helperText={
            (errors?.relevant?.type === "minLength" && "Should be longer") ||
            errors?.relevant?.message
          }
          {...register("relevant", {
            required: "Please enter your answer",
            minLength: 50,
          })}
        />
      </Box>

      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {SMARTGOALSContent.TimeBound_description}
        </Typography>
        <TextField
          id="timeBound"
          fullWidth
          multiline
          label={SMARTGOALSContent.TimeBound}
          variant="outlined"
          error={!!errors.timeBound}
          inputProps={{ minLength: 50, maxLength: 200 }}
          helperText={
            (errors?.timeBound?.type === "minLength" && "Should be longer") ||
            errors?.timeBound?.message
          }
          {...register("timeBound", {
            required: "Please enter your answer",
            minLength: 50,
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

export default SMARTGOALSEntry;
