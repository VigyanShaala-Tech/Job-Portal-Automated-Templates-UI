import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Collapse,
  CardActionArea,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  IDPFormFirst,
  IDPFormSecond,
  useUserContext,
} from "../../contexts/UserContext";
import {
  getSelectedTemplateData,
  getSelectedTemplateVersion,
} from "../../util/api";
import { TEMPLATE_ACTIONS } from "../../common/constants";
import { LinearProgress } from "@mui/material";

interface TemplateCardProps {
  backgroundColor: string;
  title: string;
  content: string;
  template: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  backgroundColor,
  title,
  content,
  template,
}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [versionNumbers, setVersionNumbers] = React.useState<Number[]>();
  const [isLoading, setLoading] = React.useState(false);
  const {
    userState: {
      IDPDataGoalAFirst,
      IDPDataGoalASecond,
      IDPDataGoalBFirst,
      IDPDataGoalBSecond,
    },
    dispatch,
  } = useUserContext();
  const userDetails = JSON.parse(sessionStorage.userDetails);
  const handleExpand = (isExpanded: boolean) => {
    setExpanded(!expanded);
    setLoading(true);
    if (!isExpanded) {
      getSelectedTemplateVersion(userDetails.email, template)
        .then((res: any) => {
          setLoading(false);
          const data = res?.data?.data;
          setVersionNumbers(
            Array.from({ length: data?.version + 1 }, (_, index) => index)
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const transformIDPData = (IDPData: any) => {
    let goalAFirst: IDPFormFirst = IDPDataGoalAFirst,
      goalASecond: IDPFormSecond = IDPDataGoalASecond,
      goalBFirst: IDPFormFirst = IDPDataGoalBFirst,
      goalBSecond: IDPFormSecond = IDPDataGoalBSecond;
    Object.keys(IDPData).forEach((key) => {
      const slicedKey = key.slice(5);
      if (key.startsWith("goala")) {
        if (IDPDataGoalAFirst.hasOwnProperty(slicedKey)) {
          goalAFirst[slicedKey as keyof IDPFormFirst] = IDPData[key];
        }
        if (IDPDataGoalASecond.hasOwnProperty(slicedKey)) {
          goalASecond[slicedKey as keyof IDPFormSecond] = IDPData[key];
        }
      } else if (key.startsWith("goalb")) {
        if (IDPDataGoalBFirst.hasOwnProperty(slicedKey)) {
          goalBFirst[slicedKey as keyof IDPFormFirst] = IDPData[key];
        }
        if (IDPDataGoalBSecond.hasOwnProperty(slicedKey)) {
          goalBSecond[slicedKey as keyof IDPFormSecond] = IDPData[key];
        }
      }
    });
    dispatch({ type: "SET_IDP_GOAL_A_FIRST", payload: goalAFirst });
    dispatch({ type: "SET_IDP_GOAL_A_SECOND", payload: goalASecond });
    dispatch({ type: "SET_IDP_GOAL_B_FIRST", payload: goalBFirst });
    dispatch({ type: "SET_IDP_GOAL_A_SECOND", payload: goalBSecond });
  };
  const updateTemplateData = (version: any) => {
    getSelectedTemplateData(userDetails.email, template, version)
      .then((res) => {
        if (template === "IDP") {
          transformIDPData(res?.data?.data[0]);
        } else {
          dispatch({
            type: TEMPLATE_ACTIONS[template],
            payload: res?.data?.data[0],
          });
        }
        dispatch({ type: "SET_SELECTED_TEMPLATE", payload: template });
        routeToEntry();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createNewTemplate = (event: any) => {
    dispatch({ type: "RESET_STATE" });
    dispatch({ type: "SET_SELECTED_TEMPLATE", payload: template });

    routeToEntry();
  };

  const iconRotateDegree = expanded ? 180 : 0;
  const routeToEntry = () => {
    navigate("/PDFGenerator/entry");
  };
  return (
    <Card
      sx={{
        backgroundColor,
        color: "white",
        transition: "0.3s all",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea onClick={createNewTemplate}>
        <CardContent sx={{ minHeight: "112px" }}>
          <Typography variant="h6" paddingBottom={2}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleExpand(expanded)}
          sx={{
            marginLeft: "auto",
            color: "white",
            backgroundColor: "#00000033",
            transition: "0.3s all",
            borderRadius: "10000px",
            padding: "5px 16px",
            ":hover": {
              background: "#ffffffcc",
              color: "#2e2e2e",
            },
          }}
          endIcon={
            <ExpandMoreIcon
              style={{
                transform: `rotate(${iconRotateDegree}deg)`,
              }}
            />
          }
        >
          PREVIOUS VERSIONS
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto">
        <CardContent>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <Typography variant="body2">
              {versionNumbers?.length ? (
                versionNumbers?.map((number) => (
                  <Button
                    variant="text"
                    sx={{ color: "white" }}
                    onClick={() => updateTemplateData(number)}
                  >
                    {number.toString()}
                  </Button>
                ))
              ) : (
                <>
                  <Typography>No Versions available</Typography>
                  <Button onClick={createNewTemplate} sx={{ color: "white" }}>
                    Create new Template
                  </Button>
                </>
              )}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TemplateCard;
