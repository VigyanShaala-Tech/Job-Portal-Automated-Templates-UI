import React, { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import IDPFirst from "./IDPFirst";
import IDPSecond from "./IDPSecond";

const IDPEntry: React.FC = () => {
  // pages: goalAPage1, goaAPage2, goalBPage1, goalBPage2
  const [currentPage, setPageName] = useState("");
  const {
    userState: {
      IDPDataGoalAFirst,
      IDPDataGoalASecond,
      IDPDataGoalBFirst,
      IDPDataGoalBSecond,
    },
  } = useUserContext();
  console.log(currentPage);
  switch (currentPage) {
    case "goalAPage1":
      return (
        <IDPFirst
          IDPData={IDPDataGoalAFirst}
          action="SET_IDP_GOAL_A_FIRST"
          setPageName={setPageName}
        />
      );
    case "goalAPage2":
      return (
        <IDPSecond
          IDPData={IDPDataGoalASecond}
          action="SET_IDP_GOAL_A_SECOND"
          setPageName={setPageName}
        />
      );
    case "goalBPage1":
      return (
        <IDPFirst
          IDPData={IDPDataGoalBFirst}
          action="SET_IDP_GOAL_B_FIRST"
          setPageName={setPageName}
        />
      );
    case "goalBPage2":
      return (
        <IDPSecond
          IDPData={IDPDataGoalBSecond}
          action="SET_IDP_GOAL_B_SECOND"
          setPageName={setPageName}
        />
      );
    default:
      return (
        <IDPFirst
          IDPData={IDPDataGoalAFirst}
          action="SET_IDP_GOAL_A_FIRST"
          setPageName={setPageName}
        />
      );
  }
};

export default IDPEntry;
