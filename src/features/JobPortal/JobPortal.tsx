import Box from "@mui/material/Box";
import { Outlet} from "react-router-dom";


export default function JobPortal() {

return (
      <Box sx={{ width: "100%" }}>
        <Outlet />
      </Box>
  );
}
