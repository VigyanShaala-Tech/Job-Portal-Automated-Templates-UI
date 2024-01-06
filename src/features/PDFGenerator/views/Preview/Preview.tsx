import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Alert, AlertTitle, Button, Container, Grid } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import RIASEC from "./RIASEC";
import SWOTAnalysis from "./SWOTAnalysis/SWOTAnalysis";
import SMARTGOALS from "./SmartGoals/SmartGoals";
import IDPPreview from "./IDP/IDPPreview";
import CriticalThinking from "./CriticalThinking";
import COLLABORATION from "./Collaboration";
import CAGM from "./CAGM";

const Preview: React.FC = () => {
  const htmlRef = React.useRef<HTMLDivElement>(null);
  const [templateToBeRendered, setTemplate] = useState(<></>);
  // const templateData = useLocation().state as TemplateData;
  const {
    userState: { selectedTemplate },
  } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    switch (selectedTemplate) {
      case "SWOT":
        setTemplate(<SWOTAnalysis />);
        break;
      case "SMARTGOALS":
        setTemplate(<SMARTGOALS />);
        break;
      case "IDP":
        setTemplate(<IDPPreview />);
        break;
      case "CT":
        setTemplate(<CriticalThinking />);
        break;
      case "RIASEC":
        setTemplate(<RIASEC />);
        break;
      case "COLLABORATION":
        setTemplate(<COLLABORATION />);
        break;
      case "CAGM":
        setTemplate(<CAGM />);
        break;
      default:
        setTemplate(
          <Alert severity="error">
            <AlertTitle>Error while loading the template!</AlertTitle>
            Please select a template from{" "}
            <Button
              variant="text"
              onClick={() => navigate("/PDFGenerator/dashboard")}
            >
              template selection page
            </Button>
          </Alert>
        );
        break;
    }
  }, []);

  const printHtmlToPdf = async () => {
    if (!htmlRef.current) {
      return;
    }

    const options = {
      padding: 20, // Set your desired margin value (in pixels)
      filename: selectedTemplate,
      image: { type: "jpeg", quality: 3 },
      html2canvas: { scale: 2 },
      /* jsPDF: {
        format: "letter",
      }, */
    };

    const sections = htmlRef.current.getElementsByClassName("page-break");

    // Create a wrapper element to hold all the sections
    const wrapper = document.createElement("div");
    wrapper.style.marginTop = `20px`; // Adjust top margin
    // wrapper.style.border = "1px solid red";

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;

      // Apply styled component styles for page break
      section.classList.add("page-break");

      // Append the section to the wrapper element
      wrapper.appendChild(section.cloneNode(true));
    }

    const pdf = html2pdf();
    pdf.set(options).from(wrapper.outerHTML).save();
  };

  const goToEntry = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(-1);
  };
  return (
    <>
      <Container id="templateContainer" ref={htmlRef} maxWidth="md">
        {templateToBeRendered}
      </Container>
      <Container id="btn-footer" maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} my={2}>
            <Button variant="outlined" fullWidth onClick={goToEntry}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md={6} my={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={printHtmlToPdf}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Preview;
