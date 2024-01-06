import { ChangeEvent, useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable";
import { getQualificationsList, saveCompanyData, saveEducationLevelData } from "../../util/api";

/* 
Admin Page to add new education level
*/
  
  interface QualificationsList {
    educationLevelId: string;
    educationLevel: string;
  }
  interface newQualification{
    educationLevel:string;
  
  }
  
  export default function EducationLevel() {
    useEffect(()=>{
      getQualificationData();
    },[])
    const [qualifications, setQualifications] = useState<newQualification>({educationLevel:""});
    const [qualificationsList, setQualificationsList] = useState<QualificationsList[]>([]);
    const [message, setMessage] = useState<string>("");

    function onQualificationsChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      setQualifications({
        educationLevel:event.target.value as string
      });
    }
    const addQualifications = async () => {
      if(qualifications.educationLevel===""){
        setMessage("Please enter a qualification.");
        return;
      }
      saveEducationLevelData(qualifications)
        .then(function (response) {
          getQualificationData();
          setMessage(response.data.statusMessage);          
        })
        .catch(function (error) {
          setMessage(error);
        });
        setQualifications({educationLevel:""});
        
    };
  
    const getQualificationData = async () => {
      getQualificationsList()
      .then((response:any)=>{
        setQualificationsList(response.data.data);
      })
      
    };
  
    return (
      <LookupTable 
      value={qualifications.educationLevel}
      onChange={onQualificationsChange}
      addField={addQualifications}
      fieldId="educationLevelId"
      fieldItems={qualificationsList}
      fieldName="educationLevel"
      heading="Qualification"
      message={message}
      tableTitle="Qualifications"
    />
    );
  }
  