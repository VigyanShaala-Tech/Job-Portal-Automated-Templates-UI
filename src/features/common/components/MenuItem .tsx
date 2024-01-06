import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { IMenuItem } from "../constants/Menu";
import { useEffect, useState } from "react";

type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
};

export const MenuItem: React.FC<Props> = ({
  route,
  literal,
  Icon,
  selected,
  onClick
}) => {
  const [showItem, setShowItem] = useState(true);

  useEffect(()=>{
    if(sessionStorage.getItem("role")?.toLowerCase()!=='admin' && literal==='Add Users'){
      setShowItem(false);
    }
    else{
      if(sessionStorage.getItem("status")?.toLowerCase()!=='yes' && literal==='Job Portal'){
        setShowItem(false);
      }
    }

  })
  
  // if(sessionStorage.getItem("status")!=='yes'){
  //   setShowItem(false);
  // }
  const link = (
    
    <ListItem
      button
      selected={selected}

      /* sx={{
        "&.Mui-selected": {
          backgroundColor: "primary.dark",
          color: "common.white",
        },
        "&:hover": {
          backgroundColor: "primary.light",
          color: "common.white",
        },
      }} */
      onClick={onClick}
    >
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
      <ListItemText primary={literal} sx={{ color: "primary.main" }} />
    </ListItem>
  );

  return route&&showItem ? (
    <Link style={{ textDecoration: "none", color: "primary.main" }} to={route}>
      {link}
    </Link>
  ) : (
    <></>
  );
};
