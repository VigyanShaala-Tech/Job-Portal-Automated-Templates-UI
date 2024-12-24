import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import LookupTable from "../../components/LookupTable";
import { getLocationList, saveLocationData } from "../../util/api";

/* 
Admin Page to add new location
*/

interface LocationList {
  jobLocationId: string;
  jobLocation: string;
}
interface newLocation{
  jobLocation:string;
}

export default function Locations() {
  useEffect(()=>{
    getLocationData();
  },[])
  const [location, setlocation] = useState<newLocation>({jobLocation:""});
  const [locationList, setLocationList] = useState<LocationList[]>([]);
  const [message, setMessage] = useState<string>("");

  function onLocationChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setlocation({
      jobLocation:event.target.value as string
    });
  }
  const addLocation = () => {
    if(location.jobLocation===""){
      setMessage("Please enter a location.");
      return;
    }
      saveLocationData(location)
      .then(function (response) {
        getLocationData();
        setMessage(response.data.statusMessage);        
      })
      .catch(function (error) {
        setMessage(error);
      });
      setlocation({jobLocation:""})
      
  };

  const getLocationData = () => {
    getLocationList().then((response:any)=>{
      setLocationList(response.data.data);
    })
    
  };

  return (
    <LookupTable 
      value={location.jobLocation}
      onChange={onLocationChange}
      addField={addLocation}
      fieldItems={locationList}
      fieldName="jobLocation"
      fieldId="jobLocationId"
      heading="Location"
      message={message}
      tableTitle="Locations"
    />
  );
}
