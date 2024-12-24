import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import PDFContent from "../../common/content";
import CancelButton from "../../components/CancelButton";
import { saveTemplateData } from "../../util/api";
import HelperText from "../../components/HelperText";

interface CAGMForm {
  answerA: string;
  answerB: string;
  answerC: string;
}

const CAGMEntry: React.FC = () => {
  const navigate = useNavigate();

  const {
    userState: { cagmData, userDetails },
    dispatch,
  } = useUserContext();
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const { CAGMContent } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    trigger,
  } = useForm<CAGMForm>({
    defaultValues: cagmData,
    mode: "all",
  });
  const onSubmit = (formValues: CAGMForm) => {
    trigger();
    const payload = { ...formValues, ...{ studentEmail: userDetails.email } };
    dispatch({
      type: "SET_CAGM_DATA",
      payload: payload,
    });
    saveTemplateData("CAGM", payload)
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
          {CAGMContent.question1}
        </Typography>
        <TextField
          id="answerA"
          fullWidth
          multiline
          label="Answer"
          variant="outlined"
          error={!!errors.answerA}
          helperText={
            (errors?.answerA?.type === "minLength" && "Should be longer") ||
            errors?.answerA?.message
          }
          inputProps={{ minLength: 150, maxLength: 500 }}
          {...register("answerA", {
            required: "Please enter your answer",
            minLength: 150,
            onChange: (event: any) => setAnswerA(event.target.value),
          })}
        />
        <HelperText
          error={errors.answerA}
          maxLength={500}
          minLength={150}
          textLength={answerA.length}
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {CAGMContent.question2}
        </Typography>
        <TextField
          id="answerB"
          fullWidth
          multiline
          label="Answer"
          variant="outlined"
          error={!!errors.answerB}
          inputProps={{ minLength: 150, maxLength: 500 }}
          {...register("answerB", {
            required: "Please enter your answer",
            minLength: 150,
            onChange: (event: any) => setAnswerB(event.target.value),
          })}
        />
        <HelperText
          error={errors.answerB}
          maxLength={500}
          minLength={150}
          textLength={answerB.length}
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle2" gutterBottom>
          {CAGMContent.question3}
        </Typography>
        <TextField
          id="answerC"
          fullWidth
          multiline
          label="Answer"
          variant="outlined"
          inputProps={{ minLength: 150, maxLength: 500 }}
          error={!!errors.answerC}
          {...register("answerC", {
            required: "Please enter your answer",
            minLength: 150,
            onChange: (event: any) => setAnswerC(event.target.value),
          })}
        />
        <HelperText
          error={errors.answerC}
          maxLength={500}
          minLength={150}
          textLength={answerC.length}
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

export default CAGMEntry;
