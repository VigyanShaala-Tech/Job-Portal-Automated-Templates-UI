import axios, {AxiosRequestConfig} from "axios";
import { getJWTToken } from "../../common/util/helper";
/* 
refer to axios documentation - https://axios-http.com/docs/intro
*/

const apiClient =(
    options: AxiosRequestConfig ={}
) => {
    const token = getJWTToken()
    const defaultOptions ={
        baseURL:process.env.REACT_APP_API_URL,
        headers: {
            "Content-type": "application/json",
            "Cross-Origin-Opener-Policy":"same-origin-allow-popups",
            "Authorization" : `Bearer ${token}`
        },
        credentials:"include" 
    };
    return axios.create({
        ...defaultOptions,
        ...options
    });
};

export const getCompanyList = async () => {
    return await apiClient().get("/job/admin/company/all")
}
export const getQualificationsList = async () => {
    return await apiClient().get("/job/admin/educationLevel/all")
}

export const getIndustryList = async () => {
    return await apiClient().get("/job/admin/industry/all")
}
export const getTitleList = async () => {
    return await apiClient().get("/job/admin/title/all")
}
export const getLocationList = async () => {
    return await apiClient().get("/job/admin/location/all")
}

export const getWorkModeList = async () => {
    return await apiClient().get("/job/admin/workmode/all")
}

export const getAllPostedJobs = async () => {
    return await apiClient().get("/job/student/job/all")
}

export const getActivePostedJobs = async (pageNumber:number) => {
    return await apiClient().get(`/job/student/job/active?pageNumber=${pageNumber}`)
}
export const deleteJob = async (id:string) => {
    return await apiClient().post("/job/admin/job/delete",id)
}

export const getJobById = async (id:string) => {

    return await apiClient().get(`/job/student/job/${id}`)
}
export const saveCompanyData = async (data: any) => {
    return await apiClient().post("/job/admin/company", data)
}
export const saveEducationLevelData = async (data: any) => {
    return await apiClient().post("/job/admin/educationLevel", data)
}
export const saveIndustryData = async (data: any) => {
    return await apiClient().post("/job/admin/industry", data)
}
export const saveTitleData = async (data: any) => {
    return await apiClient().post("/job/admin/title", data)
}
export const saveLocationData = async (data: any) => {
    return await apiClient().post("/job/admin/location", data)
}

export const saveWorkModeData = async (data: any) => {
    return await apiClient().post("/job/admin/workmode", data)
}
export const savejobApplication = async (data: any) => {
    return await apiClient().post("/job/admin/jobApplication/",data,{
        headers: {
          "content-type": "multipart/form-data",
        },
      })
}

export const getRoles = async (token: any) => {
    return await apiClient().get("/job/entitlement/getRoles")
}
export const saveJobData= async (data: any) => {
    return await apiClient().post("/job/admin/job", data)
}
export const updateJobData= async (data: any) => {
    return await apiClient().post("/job/admin/job/update", data)
}

export const searchJobs = async (data:any,pageNumber:number)=>{
    return await apiClient().get(`/job/admin/jobs/?pageNumber=${pageNumber}`, data);
}

export const uploadUsersCsv = async (data: any) => {
    return await apiClient().post("/user/uploadUserFile",data,{
        headers: {
          "content-type": "multipart/form-data",
        },
      })
}
