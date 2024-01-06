import { ChangeEvent, useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable";
import { getCompanyList, saveCompanyData } from "../../util/api";

/* 
Admin Page to add new company
*/

interface CompanyList {
  companyId: string;
  companyName: string;
}
interface newCompany{
  companyName:string;
}

export default function Company() {

  useEffect(()=>{
    getCompanyData();
  },[])
  const [company, setCompany] = useState<newCompany>({companyName:""});
  const [CompanyList, setCompanyList] = useState<CompanyList[]>([]);
  const [message, setMessage] = useState<string>("");
  
  function onCompanyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setCompany({
      companyName:event.target.value as string
    });
  }
  const addCompany = async () => {
    if(company.companyName===""){
      setMessage("Please enter a company name.");
      return;
    }
      saveCompanyData(company)
      .then(function (response) {
        getCompanyData();        
        setMessage(response.data.statusMessage);        
      })
      .catch(function (error) {
        setMessage(error);
      });
      setCompany({companyName:""});
      
  };

  const getCompanyData = async () => {
    getCompanyList()
    .then((response:any)=>{
      setCompanyList(response.data.data);
    })
    
  };

  return (
    <LookupTable 
      value={company.companyName}
      onChange={onCompanyChange}
      addField={addCompany}
      fieldItems={CompanyList}
      fieldId="companyId"
      fieldName="companyName"
      heading="Company"
      message={message}
      tableTitle="Companies"
    />
  );
}
