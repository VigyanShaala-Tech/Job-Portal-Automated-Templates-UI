import axios, {AxiosRequestConfig} from "axios";
import { getJWTToken } from "../../common/util/helper";

const apiClient =(
    options: AxiosRequestConfig ={}
) => {
    const token = getJWTToken()
    const defaultOptions ={
        baseURL: process.env.REACT_APP_API_URL,
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

export const getSWOTVersion = async (email: string) => {
    return await apiClient().get("/pdf/swot/version/"+ email)
}
export const getSWOTData = async (email: string,version: any) => {
    return await apiClient().get("/pdf/swot/"+ email +"/"+version)
}
export const saveSWOTData = async (data: any) => {

    return await apiClient().post("/pdf/swot/", data)
}

export const getSmartGoalsVersion = async (email: string) => {
    return await apiClient().get("/pdf/smartgoals/version/"+email)
}
export const getSmartGoalsData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/smartgoals/"+ email +"/"+version)
}
export const saveSmartGoalsData = async (data: any) => {
    return await apiClient().post("/pdf/smartgoals/", data)
}

export const getCTVersion = async (email: string) => {
    return await apiClient().get("/pdf/ct/version/"+email)
}
export const getCTData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/ct/"+email+"/"+ version)
}
export const saveCTData = async (data: any) => {
    return await apiClient().post("/pdf/ct/", data)
}

export const getRiasecVersion = async (email: string) => {
    return await apiClient().get("/pdf/riasec/version/"+email)
}
export const getRiasecData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/riasec/"+ email +"/"+version)
}
export const saveRiasecData = async (data: any) => {
    return await apiClient().post("/pdf/riasec/", data)
}

export const getCollaborationVersion = async (email: string) => {
    return await apiClient().get("/pdf/collaboration/version/"+email)
}
export const getCollaborationData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/collaboration/"+ email +"/"+version)
}
export const saveCollaborationData = async (data: any) => {
    return await apiClient().post("/pdf/collaboration/", data)
}

export const getCAGMVersion = async (email: string) => {
    return await apiClient().get("/pdf/creativemindset/version/"+email)
}
export const getCAGMData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/creativemindset/"+ email +"/"+version)
}
export const saveCAGMData = async (data: any) => {
    return await apiClient().post("/pdf/creativemindset/", data)
}

export const getIDPVersion = async (email: string) => {
    return await apiClient().get("/pdf/idp/idp/version/"+email)
}
export const getIDPData = async (email: string, version: any) => {
    return await apiClient().get("/pdf/idp/idp/"+ email +"/"+version)
}
export const saveIDPData = async (data: any) => {
    return await apiClient().post("/pdf/idp/idp", data)
}

export const getRoles = async () => {
    return await apiClient().get("/entitlement/getRoles")
}
export const getSelectedTemplateVersion = async (email: string, template: string) => {
    switch (template) {
        case "SWOT":
            return await getSWOTVersion(email)
        case "SMARTGOALS":
            return await getSmartGoalsVersion(email)
        case "IDP":
            return await getIDPVersion(email)
        case "CT":
            return await getCTVersion(email)
        case "RIASEC":
            return await getRiasecVersion(email)
        case "COLLABORATION":
            return await getCollaborationVersion(email)
        case "CAGM":
            return await getCAGMVersion(email)
        default:
            break;
      }
}
export const getSelectedTemplateData = async (email: string, template: string, version: any) => {
    switch (template) {
        case "SWOT":
            return await getSWOTData(email, version)
       case "SMARTGOALS":
           return await getSmartGoalsData(email, version)
        case "IDP":
            return await getIDPData(email, version)
        case "CT":
            return await getCTData(email, version)
        case "RIASEC":
            return await getRiasecData(email, version)
        case "COLLABORATION":
            return await getCollaborationData(email, version)
        case "CAGM":
            return await getCAGMData(email, version)
        default:
            break;
      }
}
export const saveTemplateData = async (template: string, data:any) => {
    switch (template) {
        case "SWOT":
            return await saveSWOTData(data)
        case "SMARTGOALS":
            return await saveSmartGoalsData(data)
        case "IDP":
            return await saveIDPData(data)
        case "CT":
            return await saveCTData(data)
        case "RIASEC":
            return await saveRiasecData(data)
        case "COLLABORATION":
            return await saveCollaborationData(data)
        case "CAGM":
            return await saveCAGMData(data)
        default:
            break;
      }
}