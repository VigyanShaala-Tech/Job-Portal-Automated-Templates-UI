import { AppBar, Toolbar, IconButton, useTheme, Box } from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import Logo from "../../common/images/logoWithBlueBG.png";

import { useDrawerContext } from "../contexts/drawer-context";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AppBar
    /* sx={{ backgroundColor: "primary.dark", color: "secondary.contrastText" }} */
    /*  sx={{
        minHeight: "115px",
      }} */
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => toggleIsOpened(!isOpened)}
          sx={{ padding: theme.spacing(1) }}
        >
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        <Box
          component="img"
          onClick={() => navigate("/home")}
          sx={{
            height: 125,
          }}
          alt="logo"
          src={Logo}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
