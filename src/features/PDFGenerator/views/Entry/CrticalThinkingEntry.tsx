import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import PDFContent from "../../common/content";
import ct from "../../common/images/CT.jpg";
import CancelButton from "../../components/CancelButton";
import { saveTemplateData } from "../../util/api";
import HelperText from "../../components/HelperText";

interface CriticalThinking {
  answerA: string;
  answerB: string;
  answerC: string;
}

const CriticalThinkingEntry: React.FC = () => {
  const navigate = useNavigate();
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const {
    userState: { criticalThinking, userDetails },
    dispatch,
  } = useUserContext();
  const { CT } = PDFContent;
  const {
    handleSubmit,
    formState: { errors },
    register,
    trigger,
  } = useForm<CriticalThinking>({
    defaultValues: criticalThinking,
    mode: "all",
  });
  const onSubmit = (formValues: CriticalThinking) => {
    trigger();
    const payload = { ...formValues, ...{ studentEmail: userDetails.email } };
    dispatch({
      type: "SET_CRITICAL_THINKING",
      payload: payload,
    });
    saveTemplateData("CT", payload)
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
          {CT.imageHeader}
        </Typography>
        <img width="100%" src={ct} alt="ct"></img>
      </Box>
      <Box my={2}>
        <Typography variant="h6" gutterBottom>
          {CT.questionHeader}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {CT.questionA}
        </Typography>
        <TextField
          id="answerA"
          fullWidth
          multiline
          label="Answer"
          variant="outlined"
          error={!!errors.answerA}
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
          {CT.questionB}
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
          {CT.questionC}
        </Typography>
        <TextField
          id="answerC"
          fullWidth
          multiline
          label="Answer"
          variant="outlined"
          error={!!errors.answerC}
          inputProps={{ minLength: 150, maxLength: 500 }}
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

export default CriticalThinkingEntry;
