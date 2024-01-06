import {
    Autocomplete,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  /*
  Filter component for filters on student home page
  */
  
  interface DropdownInterface {
    label: string;
    value: any;
    jobFilter: any;
    setJobFilter: any;
    menuItems: any;
    fieldTitle: string;
    fieldId: any;
    fieldName: any;
  }
  
  const FilterDropdown: React.FC<DropdownInterface> = ({
    label,
    jobFilter,
    setJobFilter,
    menuItems,
    fieldTitle,
    fieldId,
    fieldName,
    value
  }) => {
    const [selectState, setSelectState] = React.useState("");
    const [inputValue, setInputValue] = useState("");

    //handling clear filter
    useEffect(()=>{
        if(value===""){
            setSelectState(value);
        }
        
    },[value]);
    
    function handleDropdownChange( newValue: any): void {
      let value:string="";
      if(newValue!==null){
        value=newValue[fieldName];
      }
      setJobFilter({
        ...jobFilter,
        [fieldTitle]: value,
      });
      setSelectState(newValue);
      setInputValue(value);
    }
  
    return (
            <Autocomplete
              id={fieldTitle}
              options={menuItems}
              isOptionEqualToValue={(option: any, value) =>
                option[fieldId] === value[fieldId] || value === ""
              }
              getOptionLabel={(option) =>
                option[fieldName] ? option[fieldName] : ""
              }
              value={selectState}
              onChange={(event: any, newValue: any) => {handleDropdownChange(newValue)
                
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={
                (params) => (<>
                <TextField {...params} label={label} sx={{backgroundColor:'white'}}/></>
                
              )}
            />
    );
  };
  
  export default FilterDropdown;
  