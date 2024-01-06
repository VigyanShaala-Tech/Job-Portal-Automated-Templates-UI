import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../PDFGenerator/contexts/UserContext";
interface RouteInterface{
  role:string;
  status?:string;
}
const ProtectedRoute:React.FC<RouteInterface> = ({role, status}) => {
  const {
    userState: { userDetails },
  } = useUserContext();
  const location = useLocation();

  return (
    sessionStorage.getItem("role")?.toLowerCase()===role&&(status?sessionStorage.getItem("status")?.toLocaleLowerCase()==='yes':true) ? <Outlet /> 
        : <Navigate to="/Error" state={{from:location}} replace />
  );
};

export default ProtectedRoute;
