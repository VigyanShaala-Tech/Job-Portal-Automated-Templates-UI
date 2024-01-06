import { useLocation } from "react-router-dom";
import { List, Grid, Collapse, Divider, IconButton, Box } from "@mui/material";
import { MenuItem } from "./MenuItem ";
import { IMenuItem, IJobMenuItems } from "../constants/Menu";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

export const MenuItemsList = ({
  items = [],
  jobItems = [],
  isOpened,
}: {
  items?: IMenuItem[];
  jobItems?: IJobMenuItems[];
  isOpened: boolean;
}) => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  function handleClick() {
    if (!isOpened) {
      return;
    }
    setOpen(!open);
  }

  useEffect(() => {
    if (!isOpened) {
      setOpen(false);
    }
  }, [isOpened]);

  if (!items.length) return null;

  return (
    <Grid>
      <List sx={{ p: 0 }}>
        {items.map(({ Icon, route, literal }) =>
          //for nested rotes of job portal
          literal === "Job Portal" &&
          sessionStorage.getItem("role")?.toLowerCase() === "admin" ? (
            route && (
              <Link
                style={{ textDecoration: "none", color: "primary.main" }}
                to={route}
              >
                <Box display={"flex"}>
                  <ListItem selected={"/" + pathname.split("/")[1] === route}>
                    <ListItemIcon
                      sx={[
                        { minWidth: "auto" },
                        (theme) => ({
                          paddingRight: theme.spacing(2),
                        }),
                      ]}
                    >
                      <Icon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={literal}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItem>
                  <IconButton onClick={handleClick}>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Divider />
                  {jobItems.map(({ literal, route }) => {
                    return (
                      route && (
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                          to={route}
                        >
                          <ListItem button selected={pathname === route}>
                            <ListItemText
                              primary={literal}
                              sx={{ color: "primary.main" }}
                            />
                          </ListItem>
                        </Link>
                      )
                    );
                  })}
                </Collapse>
              </Link>
            )
          ) : (
            <MenuItem
              Icon={Icon}
              literal={literal}
              route={route}
              key={route}
              selected={pathname === route}
            />
          )
        )}
      </List>
    </Grid>
  );
};
