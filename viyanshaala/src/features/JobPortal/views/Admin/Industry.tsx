import { ChangeEvent, useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable";
import { getIndustryList, saveIndustryData } from "../../util/api";
  
  interface IndustryList {
    industryId: string;
    industry: string;
  }
  interface newIndustry{
    industry:string;
  }

  /* 
Admin Page to add new industry
*/
  
  export default function Industry() {
    useEffect(()=>{
      getIndustryData();
    },[])
    const [industry, setIndustry] = useState<newIndustry>({industry:""});
    const [industryList, setIndustryList] = useState<IndustryList[]>([]);
    const [message, setMessage] = useState<string>("");

    function onIndustryChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      setIndustry({
        industry:event.target.value as string
      });
    }
    const addIndustry = async () => {
      if(industry.industry===""){
        setMessage("Please enter a industry.");
        return;
      }
      saveIndustryData(industry)
        .then(function (response) {
          getIndustryData();
          setMessage(response.data.statusMessage);          
        })
        .catch(function (error) {
          setMessage(error);
        });
        setIndustry({industry:""})
        
    };
  
    const getIndustryData = async () => {
      getIndustryList().then((response:any)=>{
        setIndustryList(response.data.data);
      })
      
    };
  
    return (
      <LookupTable 
      value={industry.industry}
      onChange={onIndustryChange}
      addField={addIndustry}
      fieldItems={industryList}
      fieldName="industry"
      fieldId="industryId"
      heading="Industry"
      message={message}
      tableTitle="Industries"
    />
    );
  }
  