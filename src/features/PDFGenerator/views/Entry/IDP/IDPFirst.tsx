import React, { useState } from "react";
import MultilLineTextBox from "../../../components/MultilLineTextBox/MultilLineTextBox";
import {
  Box,
  Button,
  Container,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "../../../contexts/UserContext";
import PDFContent from "../../../common/content";
import CancelButton from "../../../components/CancelButton";
interface IDPForm {
  goal1: string;
  name: string;
  education1: string;
  education2: string;
  proudMoments: string;
  raisec: string;
  matchStrength: string;
  decreaseThreat: string;
  aquiredHardSkills: string;
  aquiredSoftSkills: string;
}

interface IDPFirstProps {
  IDPData: IDPForm;
  action: string;
  setPageName: Function;
}
const IDPFirst: React.FC<IDPFirstProps> = ({
  IDPData,
  action,
  setPageName,
}) => {
  const {
    //  userState: { IDP },
    dispatch,
  } = useUserContext();

  const { IDP } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<IDPForm>({
    defaultValues: IDPData,
    mode: "all",
  });
  const onSubmit = (formValues: IDPForm) => {
    trigger();
    dispatch({ type: action, payload: formValues });
    action === "SET_IDP_GOAL_A_FIRST"
      ? setPageName("goalAPage2")
      : setPageName("goalBPage2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.goalDescription}
        </Typography>
        <TextField
          id="goal1"
          fullWidth
          label={action.includes("B") ? IDP.goalLabelB : IDP.goalLabel}
          variant="outlined"
          error={!!errors.goal1}
          {...register("goal1", {
            required: "Please enter your goal",
            minLength: 50,
          })}
          inputProps={{ minLength: 50, maxLength: 250 }}
          helperText={
            (errors?.goal1?.type === "minLength" && "Should be longer") ||
            errors?.goal1?.message
          }
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.nameDescription}
        </Typography>
        <TextField
          id="name"
          fullWidth
          label={IDP.nameLabel}
          variant="outlined"
          error={!!errors.name}
          {...register("name", {
            required: "Please enter your full name",
            minLength: 5,
          })}
          inputProps={{ minLength: 5, maxLength: 50 }}
          helperText={
            (errors?.name?.type === "minLength" && "Should be longer") ||
            errors?.name?.message
          }
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.education1Description}
        </Typography>
        <TextField
          id="education1"
          fullWidth
          label={IDP.education1Label}
          variant="outlined"
          error={!!errors.education1}
          {...register("education1", {
            required: "Please enter your education details",
            minLength: 5,
          })}
          inputProps={{ minLength: 5, maxLength: 50 }}
          helperText={
            (errors?.education1?.type === "minLength" && "Should be longer") ||
            errors?.education1?.message
          }
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.education2Description}
        </Typography>
        <TextField
          id="education2"
          fullWidth
          label={IDP.education2Label}
          variant="outlined"
          error={!!errors.education2}
          {...register("education2", {
            required: "Please enter your education details",
            minLength: 5,
          })}
          inputProps={{ minLength: 5, maxLength: 50 }}
          helperText={
            (errors?.education2?.type === "minLength" && "Should be longer") ||
            errors?.education2?.message
          }
        />
      </Box>
      <MultilLineTextBox
        label={IDP.proudMomentsLabel}
        description={IDP.proudMomentDescription}
        register={register}
        error={errors?.proudMoments}
        value={IDPData.proudMoments}
        fieldID="proudMoments"
        minLength={100}
        maxLength={500}
      />
      <MultilLineTextBox
        label={IDP.raisecLabel}
        description={IDP.raisecDescription}
        register={register}
        error={errors?.raisec}
        value={IDPData.raisec}
        fieldID="raisec"
        minLength={15}
        maxLength={25}
      />
      <MultilLineTextBox
        label={IDP.matchStrengthLabel}
        description={IDP.matchStrengthDescription}
        register={register}
        error={errors?.matchStrength}
        value={IDPData.matchStrength}
        fieldID="matchStrength"
        minLength={100}
        maxLength={500}
      />
      <MultilLineTextBox
        label={IDP.decThreatLabel}
        description={IDP.decThreatDescription}
        register={register}
        error={errors?.decreaseThreat}
        value={IDPData.decreaseThreat}
        fieldID="decreaseThreat"
        minLength={100}
        maxLength={500}
      />
      <MultilLineTextBox
        label={IDP.aquiredHardSkillsLabel}
        description={IDP.aquiredHardSkillsDescription}
        register={register}
        error={errors?.aquiredHardSkills}
        value={IDPData.aquiredHardSkills}
        fieldID="aquiredHardSkills"
        minLength={15}
        maxLength={110}
      />
      <MultilLineTextBox
        label={IDP.aquiredSoftSkillsLabel}
        description={IDP.aquiredSoftSkillsDescription}
        register={register}
        error={errors?.aquiredSoftSkills}
        value={IDPData.aquiredSoftSkills}
        fieldID="aquiredSoftSkills"
        minLength={15}
        maxLength={110}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {action === "SET_IDP_GOAL_A_FIRST" ? (
            <CancelButton />
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setPageName("goalAPage2")}
            >
              Back
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default IDPFirst;
