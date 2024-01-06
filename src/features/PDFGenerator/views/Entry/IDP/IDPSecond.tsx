import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { IDPFormFirst, useUserContext } from "../../../contexts/UserContext";
import PDFContent from "../../../common/content";
import { saveTemplateData } from "../../../util/api";
interface IDPFormSecond {
  goal2: string;
  careerOptions: string;
  hardSkillsToAquire: string;
  softSkillsToAquire: string;
  employers: string;
  mentor1: string;
  mentor2: string;
  mentor3: string;
  mentor4: string;
  mileStone1: string;
  mileStone2: string;
  mileStone3: string;
  m1Step1: string;
  m1Step2: string;
  m1Step3: string;
  m2Step1: string;
  m2Step2: string;
  m2Step3: string;
  m3Step1: string;
  m3Step2: string;
  m3Step3: string;
  adjustment: string;
  review: string;
}
interface IDPServiceData {
  [key: string]: string;
}

interface IDPSecondProps {
  IDPData: IDPFormSecond;
  action: string;
  setPageName: Function;
}
const IDPSecond: React.FC<IDPSecondProps> = ({
  IDPData,
  action,
  setPageName,
}) => {
  const navigate = useNavigate();

  const {
    userState: {
      IDPDataGoalAFirst,
      IDPDataGoalBFirst,
      IDPDataGoalASecond,
      userDetails,
    },
    dispatch,
  } = useUserContext();

  const { IDP } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
  } = useForm<IDPFormSecond>({
    defaultValues: IDPData,
    mode: "all",
  });
  const onSubmit = (formValues: IDPFormSecond) => {
    trigger();

    dispatch({ type: action, payload: formValues });
    action === "SET_IDP_GOAL_A_SECOND"
      ? setPageName("goalBPage1")
      : saveTemplate(formValues);
  };

  const saveTemplate = (formValues: IDPFormSecond) => {
    let serviceObj: IDPServiceData = {};
    Object.keys(IDPDataGoalAFirst).forEach((key) => {
      serviceObj[`goala${key}`] = IDPDataGoalAFirst[key as keyof IDPFormFirst];
    });
    Object.keys(IDPDataGoalASecond).forEach((key) => {
      serviceObj[`goala${key}`] =
        IDPDataGoalASecond[key as keyof IDPFormSecond];
    });
    Object.keys(IDPDataGoalBFirst).forEach((key) => {
      serviceObj[`goalb${key}`] = IDPDataGoalBFirst[key as keyof IDPFormFirst];
    });
    Object.keys(formValues).forEach((key) => {
      serviceObj[`goalb${key}`] = formValues[key as keyof IDPFormSecond];
    });
    serviceObj["studentEmail"] = userDetails.email;
    serviceObj["studentName"] = userDetails.name;
    saveTemplateData("IDP", serviceObj)
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
        <Typography variant="subtitle2" gutterBottom>
          {IDP.goalDescription}
        </Typography>
        <TextField
          id="goal2"
          fullWidth
          label={action.includes("B") ? IDP.goalLabelB : IDP.goalLabel}
          variant="outlined"
          error={!!errors.goal2}
          {...register("goal2", {
            required: "Please enter your goal",
            minLength: 50,
          })}
          inputProps={{ minLength: 50, maxLength: 250 }}
          helperText={
            (errors?.goal2?.type === "minLength" && "Should be longer") ||
            errors?.goal2?.message
          }
        />
      </Box>
      <MultilLineTextBox
        label={IDP.careerOptionsLabel}
        description={IDP.careerOptionDes}
        register={register}
        error={errors?.careerOptions}
        value={IDPData.careerOptions}
        fieldID="careerOptions"
        minLength={50}
        maxLength={250}
      />
      <MultilLineTextBox
        label={IDP.hardSkillstoAquireLabel}
        description={IDP.hardSkillsToAquireDes}
        register={register}
        error={errors?.hardSkillsToAquire}
        value={IDPData.hardSkillsToAquire}
        fieldID="hardSkillsToAquire"
        minLength={15}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.softSkillsToAquireLabel}
        description={IDP.softSkillsToAquireDes}
        register={register}
        error={errors?.softSkillsToAquire}
        value={IDPData.softSkillsToAquire}
        fieldID="softSkillsToAquire"
        minLength={15}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.employerLabel}
        description={IDP.employerDes}
        register={register}
        error={errors?.employers}
        value={IDPData.employers}
        fieldID="employers"
        minLength={15}
        maxLength={50}
      />
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.mentorsDes}
        </Typography>
        <TextField
          id="mentor1"
          fullWidth
          label={IDP.mentorsLabel}
          variant="outlined"
          error={!!errors.mentor1}
          {...register("mentor1", {
            required: "Please enter your mentor name",
            minLength: 5,
          })}
          inputProps={{ minLength: 5, maxLength: 25 }}
          helperText={
            (errors?.mentor1?.type === "minLength" && "Should be longer") ||
            errors?.mentor1?.message
          }
        />
      </Box>
      <Box my={2}>
        <TextField
          id="mentor2"
          fullWidth
          label={IDP.mentorsLabel}
          variant="outlined"
          error={!!errors.mentor2}
          {...register("mentor2", {
            required: "Please enter your mentor name",
            minLength: 5,
          })}
          inputProps={{ minLength: 5, maxLength: 25 }}
          helperText={
            (errors?.mentor2?.type === "minLength" && "Should be longer") ||
            errors?.mentor2?.message
          }
        />
      </Box>
      <Box my={2}>
        <TextField
          id="mentor3"
          fullWidth
          label={IDP.mentorsLabel}
          variant="outlined"
          error={!!errors.mentor3}
          {...register("mentor3", {
            required: false,
          })}
          inputProps={{ minLength: 5, maxLength: 25 }}
        />
      </Box>
      <Box my={2}>
        <TextField
          id="mentor4"
          fullWidth
          label={IDP.mentorsLabel}
          variant="outlined"
          error={!!errors.mentor4}
          {...register("mentor4", {
            required: false,
          })}
          inputProps={{ minLength: 5, maxLength: 25 }}
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.DM1Des}
        </Typography>
        <TextField
          id="mileStone1"
          fullWidth
          label={IDP.DM1Label}
          variant="outlined"
          error={!!errors.mileStone1}
          {...register("mileStone1", {
            required: "Please enter your Milestone 1",
            minLength: 15,
          })}
          inputProps={{ minLength: 15, maxLength: 50 }}
          helperText={
            (errors?.mileStone1?.type === "minLength" && "Should be longer") ||
            errors?.mileStone1?.message
          }
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.DM2Des}
        </Typography>
        <TextField
          id="mileStone2"
          fullWidth
          label={IDP.DM2Label}
          variant="outlined"
          error={!!errors.mileStone2}
          {...register("mileStone2", {
            required: "Please enter your Milestone 2",
            minLength: 15,
          })}
          inputProps={{ minLength: 15, maxLength: 50 }}
          helperText={
            (errors?.mileStone2?.type === "minLength" && "Should be longer") ||
            errors?.mileStone2?.message
          }
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {IDP.DM1Des}
        </Typography>
        <TextField
          id="mileStone3"
          fullWidth
          label={IDP.DM3Label}
          variant="outlined"
          error={!!errors.mileStone3}
          {...register("mileStone3", {
            required: "Please enter your Milestone 3",
            minLength: 15,
          })}
          inputProps={{ minLength: 15, maxLength: 50 }}
          helperText={
            (errors?.mileStone3?.type === "minLength" && "Should be longer") ||
            errors?.mileStone3?.message
          }
        />
      </Box>
      <MultilLineTextBox
        label={IDP.M1S1Label}
        description={IDP.M1S1Des}
        register={register}
        error={errors?.m1Step1}
        value={IDPData.m1Step1}
        fieldID="m1Step1"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M1S2Label}
        description={IDP.M1S2Des}
        register={register}
        error={errors?.m1Step2}
        value={IDPData.m1Step2}
        fieldID="m1Step2"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M1S3Label}
        description={IDP.M1S3Des}
        register={register}
        error={errors?.m1Step3}
        value={IDPData.m1Step3}
        fieldID="m1Step3"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M2S1Label}
        description={IDP.M2S1Des}
        register={register}
        error={errors?.m2Step1}
        value={IDPData.m2Step1}
        fieldID="m2Step1"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M2S2Label}
        description={IDP.M2S2Des}
        register={register}
        error={errors?.m2Step2}
        value={IDPData.m2Step2}
        fieldID="m2Step2"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M2S3Label}
        description={IDP.M2S3Des}
        register={register}
        error={errors?.m2Step3}
        value={IDPData.m2Step3}
        fieldID="m2Step3"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M3S1Label}
        description={IDP.M3S1Des}
        register={register}
        error={errors?.m3Step1}
        value={IDPData.m3Step1}
        fieldID="m3Step1"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M3S2Label}
        description={IDP.M3S2Des}
        register={register}
        error={errors?.m3Step2}
        value={IDPData.m3Step2}
        fieldID="m3Step2"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.M3S3Label}
        description={IDP.M3S3Des}
        register={register}
        error={errors?.m3Step3}
        value={IDPData.m3Step3}
        fieldID="m3Step3"
        minLength={25}
        maxLength={100}
      />
      <MultilLineTextBox
        label={IDP.adjustmentLabel}
        description={IDP.adjustmentDes}
        register={register}
        error={errors?.adjustment}
        value={IDPData.adjustment}
        fieldID="adjustment"
        maxLength={150}
        minLength={25}
        isOptional={true}
      />
      <MultilLineTextBox
        label={IDP.reviewLabel}
        description={IDP.reviewDes}
        register={register}
        error={errors?.review}
        value={IDPData.review}
        fieldID="review"
        maxLength={150}
        minLength={25}
        isOptional={true}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() =>
              action === "SET_IDP_GOAL_A_SECOND"
                ? setPageName("goalAPage1")
                : setPageName("goalBPage1")
            }
          >
            Back
          </Button>
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

export default IDPSecond;
