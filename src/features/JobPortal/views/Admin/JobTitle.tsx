import { ChangeEvent, useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable";
import { getTitleList, saveTitleData } from "../../util/api";
/* 
Admin Page to add new title
*/
interface JobTitleList {
  jobTitleId: string;
  jobTitle: string;
}
interface newJobTitle{
  jobTitle:string;
}

export default function JobTitle() {
  useEffect(()=>{
    getTitleData();
  },[])
  const [jobTitle, setJobTitle] = useState<newJobTitle>({jobTitle:""});
  const [jobTitleList, setJobTitleList] = useState<JobTitleList[]>([]);
  const [message, setMessage] = useState<string>("");

  function onJobTitleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setJobTitle({
      jobTitle:event.target.value as string
    });
  }
  const addJobTitle = async () => {
    if(jobTitle.jobTitle===""){
      setMessage("Please enter a company name.");
      return;
    }
    saveTitleData(jobTitle)
      .then(function (response) {
        getTitleData();
        setMessage(response.data.statusMessage);        
      })
      .catch(function (error) {
        setMessage(error);
      });
      setJobTitle({jobTitle:""});
      
  };

  const getTitleData = async () => {
    getTitleList().then((response:any)=>{
      setJobTitleList(response.data.data);
    })
    
  };

  return (
    <LookupTable 
      value={jobTitle.jobTitle}
      onChange={onJobTitleChange}
      addField={addJobTitle}
      fieldItems={jobTitleList}
      fieldName="jobTitle"
      fieldId="jobTitleId"
      heading="Job Title"
      message={message}
      tableTitle="Job Titles"
    />
  );
}
