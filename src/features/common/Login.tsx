import React, { useState } from "react";
import { Container, Alert, Typography, Box } from "@mui/material";
import { getRoles } from "../PDFGenerator/util/api";
import { GoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../PDFGenerator/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { setJWTTokenCookie } from "./util/helper";
import Logo from "../PDFGenerator/common/images/logo.png";
import login from "../common/images/login.jpg";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { Link } from "@mui/material";

const BackgroundContainer = styled(Box)`
  position: relative;
`;
const BackgroundImage = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: -5;
  width: 100%;
  object-fit: contain;
`;

const LoginPage: React.FC = () => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const checkRole = (response: any) => {
    setLoading(true);
    setError(false);

    setJWTTokenCookie(response?.credential);
    getRoles()
      .then((res) => {
        console.log(res);
        setLoading(false);
        const studentData = res?.data?.data;
        if (studentData.role !== "None") {
          const userDetailObj = {
            email: studentData?.email,
            name: studentData?.name,
            role: studentData?.role,
            cohort: studentData?.cohort || "internship",
            completionStatus: studentData?.completionStatus,
          };
          sessionStorage.setItem("userDetails", JSON.stringify(userDetailObj));
          sessionStorage.setItem("role", studentData?.role);
          sessionStorage.setItem("status", studentData?.completionStatus);
          sessionStorage.setItem("studentID", studentData?.email);
          dispatch({
            type: "SET_USER_DETAILS",
            payload: userDetailObj,
          });

          navigate("/home");
        } else {
          // sessionStorage.setItem("role", studentData?.role);
          setError(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);

        console.log(err);
      });
  };

  return (
    <Container maxWidth="md">
      <BackgroundContainer>
        <Box
          sx={{
            marginTop: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="img" alt="logo" src={Logo} mt={-5} />

          <Typography variant="h6" color="primary" marginTop={2}>
            Login to VigyanShaala
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Box mt={4}>
                <GoogleLogin onSuccess={checkRole} />
              </Box>
              {error && (
                <Box m={1}>
                  <Alert severity="error">
                    Please register with VigyanShaala Kalpana program{" "}
                    <Link href="https://link.vigyanshaala.com/Kalpana_Registration">
                      here
                    </Link>
                  </Alert>
                </Box>
              )}
            </>
          )}
        </Box>

        <BackgroundImage src={login} height={500} alt="bacground" />
      </BackgroundContainer>
    </Container>
  );
};

export default LoginPage;
