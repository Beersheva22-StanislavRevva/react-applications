import { CSSProperties, useMemo, useState} from "react";
import timeZones from '../time-zones';
import React from "react";
import Input from "../components/common/Input";
import InputResult from "../components/model/InputResult";
type Props = {
    time: Date,
    region: string
};
const style: CSSProperties = {display: "flex",
     flexDirection: "column", alignItems: 'center',textAlign: "center"};

function getZone(region: string): string|undefined {
    const zone =
     timeZones.find(e => JSON.stringify(e).includes(region));
     return zone?.name;
}
function setRegion (region:string): InputResult {
let status;
const message = region;
if (getZone(region) == undefined) {
    status = "error"
    return {status:"error", message:message}
}
else {
    return {status:"success", message:message}
}
}


export const Clock: React.FC<Props> = ({time, region}) => {
    const timeZone: string|undefined = useMemo (() => getZone(region), [region]);
    const title: string = (timeZone) || 'Israel';
   const showTime: string = time.toLocaleTimeString(undefined,
     {timeZone})
    const [region1,callbackFn] = useState<string>(region); 
return <div style={style}>
    <header>
        time zone: <br/> {title}
    </header>
        <p>{showTime}</p>
        <Input submitFn={function (inputText: string): InputResult {
  console.log(inputText);
  setRegion(inputText);
  callbackFn(region);
  return {status:"success", message:inputText};
  } } type = "text" placeholder={"enter"} buttonTitle="set time"/>
    </div>
}