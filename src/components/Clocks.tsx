import { useState, useEffect } from "react";
import { Clock } from "./Clock"

const Clocks:React.FC = () => {
    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
       setTime(new Date());
      
   }, 1000 );
   return () => clearInterval(intervalId)
   }, [])
    return <div style={{display: 'flex',
     flexDirection: 'row', justifyContent: 'space-around'}}>
       <Clock time={time} region="Europe/Dublin"/>
       <Clock time={time} region="Europe/Berlin" />
       <Clock time={time} region="Asia/Jerusalem"/>
       <Clock time={time} region="Australia/Brisbane"/>
    </div>
}
export default Clocks