import React from "react";
import { useNavigate } from "react-router-dom";
import MultilLineTextBox from "../../components/MultilLineTextBox/MultilLineTextBox";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import CancelButton from "../../components/CancelButton";
import { saveTemplateData } from "../../util/api";
import PDFContent from "../../common/content";

interface SWOTForm {
  studentName: string;
  studentDegree: string;
  goal: string;
  strength: string;
  weakness: string;
  opportunity: string;
  threat: string;
}
const IDPEntry: React.FC = () => {
  const navigate = useNavigate();

  const {
    userState: { SWOTData, userDetails },
    dispatch,
  } = useUserContext();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<SWOTForm>({
    defaultValues: SWOTData,
    mode: "all",
  });
  const { SWOT } = PDFContent;
  const onSubmit = (formValues: SWOTForm) => {
    trigger();
    dispatch({ type: "SET_SWOT_DATA", payload: formValues });
    const payload = { ...formValues, ...{ studentEmail: userDetails.email } };
    saveTemplateData("SWOT", payload)
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
          variant="outlined"
          fullWidth
          label="Name"
          error={!!errors.studentName}
          helperText={errors?.studentName?.message}
          {...register("studentName", {
            required: "Please enter the name",
          })}
        />
      </Box>
      <Box my={2}>
        <TextField
          id="degree"
          fullWidth
          label="Studying Degree"
          variant="outlined"
          error={!!errors.studentDegree}
          helperText={errors?.studentDegree?.message}
          {...register("studentDegree", {
            required: "Please enter the studying degree",
          })}
        />
      </Box>
      <Box my={2}>
        <TextField
          id="goal"
          fullWidth
          label="Short-term goal"
          variant="outlined"
          error={!!errors.goal}
          helperText={errors?.goal?.message}
          {...register("goal", {
            required: "Please enter the goal",
          })}
        />
      </Box>

      <MultilLineTextBox
        label={SWOT.strengthLabel}
        description={SWOT.strengthDes}
        register={register}
        error={errors?.strength}
        value={SWOTData.strength}
        maxLength={500}
        minLength={250}
      />
      <MultilLineTextBox
        label={SWOT.weaknessLabel}
        description={SWOT.weaknessDes}
        register={register}
        error={errors?.weakness}
        value={SWOTData.weakness}
        maxLength={500}
        minLength={250}
      />
      <MultilLineTextBox
        label={SWOT.opportunityLabel}
        description={SWOT.opportunityDes}
        register={register}
        error={errors?.opportunity}
        value={SWOTData.opportunity}
        maxLength={500}
        minLength={250}
      />
      <MultilLineTextBox
        label={SWOT.threatLabel}
        description={SWOT.threatDes}
        register={register}
        error={errors?.threat}
        value={SWOTData.threat}
        maxLength={500}
        minLength={250}
      />
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

export default IDPEntry;
