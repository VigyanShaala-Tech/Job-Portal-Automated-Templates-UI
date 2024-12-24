import {
  Autocomplete,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
/* 
dropdown component for post job page for admin
*/
interface DropdownInterface {
  labelId: string;
  label: string;
  register?: any;
  value: any;
  error?: any;
  control: any;
  job?: any;
  setJob?: any;
  menuItems: any;
  fieldTitle: string;
  fieldId: any;
  fieldName: any;
  handleFilterChange?:(event: SelectChangeEvent)=>any
  required?:boolean
}

const Dropdown: React.FC<DropdownInterface> = ({
  labelId,
  label,
  register,
  error,
  control,
  job,
  setJob,
  menuItems,
  fieldTitle,
  fieldId,
  fieldName,
  handleFilterChange,
  value,
  required
}) => {
  const [selectState, setSelectState] = React.useState(value);
  const [inputValue, setInputValue] = useState("");
  function handleDropdownChange(event: any, newValue: any): void {
    setJob({
      ...job,
      [fieldTitle]: newValue,
    });
    setSelectState(newValue);
  }

  return (
    <>
      <Controller
        name={fieldTitle}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id={fieldTitle}
            options={menuItems}
            isOptionEqualToValue={(option: any, value) =>
              option[fieldId] === value[fieldId] || value[fieldId] === ""
            }
            getOptionLabel={(option) =>
              option[fieldName] ? option[fieldName] : ""
            }
            value={selectState}
            {...register(fieldTitle, {
              required: required && "Please select a value",
            })}
            onChange={(event: any, newValue: any) => {
              if(required){
                handleDropdownChange(event, newValue);
              }
              else(
               handleFilterChange && handleFilterChange(event) 
              )
              
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={label} error={error} />
            )}
          />
        )}
      />
     
    </>
  );
};

export default Dropdown;
