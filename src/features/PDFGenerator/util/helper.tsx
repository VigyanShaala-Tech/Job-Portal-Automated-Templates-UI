import { Typography } from "@mui/material";

export const convertBulletText = (text: string, bulletStyle: string) => {
  let unicodeChar = "";
  switch (bulletStyle) {
    case "check":
      unicodeChar = "\u2713";
      break;
    case "circle":
      unicodeChar = "\u25cb";
      break;
    case "square":
      unicodeChar = "\u25aa";
      break;
    default:
      unicodeChar = "\u2022";
      break;
  }
  const bulletPoints = text?.split("• ").filter((point) => point.trim());
  return bulletPoints?.map((point, index) => (
    <div key={index} style={{ display: "flex" }}>
      <Typography
        variant="body2"
        sx={{ wordWrap: "break-word" /* , hyphens: "auto" */ }}
      >
        {unicodeChar} {point}
      </Typography>
    </div>
  ));
};

export const convertToPara = (text: string) => {
  const bulletPoints = text?.split("• ").filter((point) => point.trim());
  return bulletPoints?.map((point) => (
    <Typography fontSize={12}>
      {"\u2022"} {point}
    </Typography>
  ));
};
