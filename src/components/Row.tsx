import { ReactNode } from "react"
import lifeConfig from '../config/life-game-config.json'
const {dimension, tick} = lifeConfig;
const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
const size = windowInnerHeight < windowInnerWidth 
? String(100/dimension*0.9)+'vh'
: String(100/dimension*0.9)+'vw';

const Row: React.FC<{row: number[]}> = ({row}) => {
    function getDivs(): ReactNode {
        return row.map((num, index) =>
         <div key = {index} style = {{width: size, height: size, backgroundColor: num ?
             'black': 'white', border: 'solid 1px gray'}}></div>)
    }
    return <section style = {{display:'flex'}}>
        {getDivs()}
    </section>
}
export default Row;