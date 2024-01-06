import React from "react";
import { useUserContext } from "../../../contexts/UserContext";
import IDPFirstPreview from "./IDPFirstPreview";
import IDPSecondPreview from "./IDPSecondPreview";
import styled from "styled-components";
const IDPPreview: React.FC = () => {
  const {
    userState: {
      IDPDataGoalAFirst,
      IDPDataGoalASecond,
      IDPDataGoalBFirst,
      IDPDataGoalBSecond,
    },
  } = useUserContext();
  const PageBreak = styled.div`
    page-break-after: always;
  `;
  return (
    <>
      <PageBreak
        className="page-break"
        style={{
          /* border: "1px solid red", */
          width: "210mm",
          height: "1098.5px",
        }}
      >
        <IDPFirstPreview data={IDPDataGoalAFirst} />
      </PageBreak>
      <PageBreak
        className="page-break"
        style={{
          /*  border: "1px solid red", */
          width: "210mm",
          height: "291mm",
          marginTop: "10px",
        }}
      >
        <IDPSecondPreview data={IDPDataGoalASecond} />
      </PageBreak>
      <PageBreak
        className="page-break"
        style={{
          /* border: "1px solid red", */
          width: "210mm",
          height: "1098.5px",
          marginTop: "20px",
        }}
      >
        <IDPFirstPreview goalName="B" data={IDPDataGoalBFirst} />
      </PageBreak>
      <PageBreak
        className="page-break"
        style={{
          /* border: "1px solid red", */
          width: "210mm",
          height: "291mm",
          marginTop: "10px",
        }}
      >
        <IDPSecondPreview goalName="B" data={IDPDataGoalBSecond} />
      </PageBreak>
    </>
  );
};
export default IDPPreview;
