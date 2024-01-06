import React, { Fragment } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Preview from "./features/PDFGenerator/views/Preview/Preview";
import Entry from "./features/PDFGenerator/views/Entry/Entry";
import IDP from "./features/PDFGenerator/views/Preview/IDP/IDPPreview";
import LoginPage from "./features/common/Login";
import TemplateSelectionDashboard from "./features/PDFGenerator/views/Dashboard/Dashboard";
import Dashboard from "./features/common/Dashboard";
import JobPortal from "./features/JobPortal/JobPortal";
import HomePage from "./features/JobPortal/views/Home/HomePage";
import PostJob from "./features/JobPortal/views/PostJob/PostJob";
import Locations from "./features/JobPortal/views/Admin/Locations";
import Company from "./features/JobPortal/views/Admin/Company";
import JobTitle from "./features/JobPortal/views/Admin/JobTitle";
import Industry from "./features/JobPortal/views/Admin/Industry";
import WorkMode from "./features/JobPortal/views/Admin/WorkMode";
import EducationLevel from "./features/JobPortal/views/Admin/EducationLevel";
import AdminJobList from "./features/JobPortal/views/PostJob/AdminJobList";
import JobDetailsView from "./features/JobPortal/views/Jobs/JobDetailsView";
import ApplyJob from "./features/JobPortal/views/Jobs/ApplyJob";
import Error from "./features/common/Error";
import ProtectedRoute from "./features/common/ProtectedRoute";
import AddUsers from "./features/common/AddUsers";

const AppRoutes: React.FC = () => (
  
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<Dashboard />} />
    <Route element={<ProtectedRoute role={'admin'} />}><Route path="/AddUsers" element={<AddUsers />} /></Route>
    <Route
      path="/PDFGenerator/dashboard"
      element={<TemplateSelectionDashboard />}
    />
    <Route path="/PDFGenerator/preview" element={<Preview />} />
    <Route path="/PDFGenerator/entry" element={<Entry />} />
    <Route path="/PDFGenerator/IDP" element={<IDP />} />
    
    <Route path= "/JobPortal" element= {<JobPortal />}>
      {sessionStorage.getItem("role")?.toLowerCase()==='admin' ?  <Route index element={<Navigate to= "ManageJobs" />} />: <Route index element={<Navigate to= "Home" />} />}
      <Route element={<ProtectedRoute role="student" status='Yes'/>}>
          <Route path= "Home" element= {<HomePage />} />
          <Route path = "Home/Job/:id" element = {<JobDetailsView />} />
          <Route path = "Home/Job/:id/Apply" element={<ApplyJob />} />
          </Route>
          <Route element={<ProtectedRoute role={'admin'} />}>
          <Route path= "ManageJobs" element= {<AdminJobList/>} />
          <Route path= "ManageJobs/New" element= {<PostJob editing={false} />} />      
          <Route path = "Locations" element= {<Locations />} />
          <Route path = "Companies" element= {<Company />} />
          <Route path = "JobTitles" element = {<JobTitle />} />
          <Route path = "Industries" element = {<Industry />} />
          <Route path = "WorkModes" element = {<WorkMode />} />
          <Route path = "EducationQualifications" element = {<EducationLevel />} />          
          <Route path = "ManageJobs/Job/:id" element = {<JobDetailsView />} />
          <Route path = "ManageJobs/Job/:id/Edit" element = {<PostJob editing={true} />} />          
        </Route>
        </Route>
      <Route path="/Error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
);

export default AppRoutes;
