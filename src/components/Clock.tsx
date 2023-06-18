import { CSSProperties} from "react";
import timeZones from '../time-zones';
import React from "react";
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
export const Clock: React.FC<Props> = ({time, region}) => {
    const timeZone: string|undefined = getZone(region);
    const title: string = (timeZone) || 'Israel';
   const showTime: string = time.toLocaleTimeString(undefined,
     {timeZone}) 
return <div style={style}>
    <header>
        time zone: <br/> {title}
    </header>
        <p>{showTime}</p>
    </div>
}