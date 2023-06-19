import { useState, useEffect } from "react";
import { Clock } from "./Clock"
import config from "./common/config.json" 

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
    {config.timezones.map((e) => (<Clock time={time} region={e} />))}
    </div>
}
export default Clocks