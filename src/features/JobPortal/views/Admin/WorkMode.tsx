import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import LookupTable from "../../components/LookupTable";
import { getWorkModeList, saveWorkModeData } from "../../util/api";
/* 
Admin Page to add new work mode
*/
  
  interface WorkModeList {
    workModeId: string;
    workMode: string;
  }
  interface newWorkMode{
    workMode:string;  
  }
  
  export default function WorkMode() {
    useEffect(()=>{
      getWorkModeData();
    },[]);
    const [workMode, setWorkMode] = useState<newWorkMode>({workMode:""});
    const [workModeList, setWorkModeList] = useState<WorkModeList[]>([]);
    const [message, setMessage] = useState<string>("");

    function onWorkModeChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
      setWorkMode({
        workMode:event.target.value as string
      });
    }

    const addWorkMode= async () => {
      if(workMode.workMode===""){
        setMessage("Please enter a work mode.");
        return;
      }
      saveWorkModeData(workMode)
        .then(function (response) {
          getWorkModeData();
          setMessage(response.data.statusMessage);          
        })
        .catch(function (error) {
          console.log(error);
          setMessage(error);
        });
        setWorkMode({workMode:""});
        
    };
  
    const getWorkModeData = async () => {
      getWorkModeList().then((response:any)=>{
        setWorkModeList(response.data.data);
      })
      
    };
  
    return (
      <LookupTable 
      value={workMode.workMode}
      onChange={onWorkModeChange}
      addField={addWorkMode}
      fieldItems={workModeList}
      fieldName="workMode"
      fieldId="workModeId"
      heading="Work Mode"
      message={message}
      tableTitle="Work Modes"
    />
    );
  }
  