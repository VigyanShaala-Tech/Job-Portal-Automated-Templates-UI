import { PropsWithChildren } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  Business,
  PhoneIphone,
  Email,
} from "@mui/icons-material";
import footerLogo from "../images/footerLogo.png";

export const Footer = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useTheme();

  if (!children) {
    return null;
  }

  return (
    <Box
      sx={{
        background: theme.palette.primary.dark,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Box component="img" alt="logo" height={70} src={footerLogo} />
            <Typography variant="body2">
              At VigyanShaala, we equip youth with quality STEM skills through
              project-based learning to enable social and transformational
              change. Our goal is to facilitate the creation of innovative,
              youth lead ecosystems for mentoring and STEM skilling at the
              community level.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" alignItems="center">
              <Business alignmentBaseline="middle" /> {" C-432 Sector B,"}
            </Typography>
            <Typography variant="body2">
              Avantika, Sec-1 Rohini, New Delhi
            </Typography>
            <Typography variant="body2">India</Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
              <Email fontSize="small" />{" "}
              <Typography variant="body2"> VigyanShaala@gmail.com</Typography>
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
              <PhoneIphone />{" "}
              <Typography variant="body2">
                +91 7028422265, +91 7058962024
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          <Link
            href="https://www.facebook.com/VigyanShaala/"
            color="inherit"
            sx={{ pr: 1 }}
          >
            <Facebook />
          </Link>

          <Link
            href="https://twitter.com/VIGYANshaala"
            color="inherit"
            sx={{ pl: 1, pr: 1 }}
          >
            <Twitter />
          </Link>
          <Link
            href="https://www.linkedin.com/company/65391120/"
            color="inherit"
            sx={{ pl: 1, pr: 1 }}
          >
            <LinkedIn />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UC-vXDr6nyeD4FfA5RPSj22w"
            color="inherit"
            sx={{ pl: 1, pr: 1 }}
          >
            <YouTube />
          </Link>
          <Typography variant="body2">
            {"© "} {new Date().getFullYear()}{" "}
            <Link color="inherit" href="https://vigyanshaala.org/">
              VigyanShaala
            </Link>
            {" | "}
            All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
