import { useEffect, useRef, useState } from "react";
import LifeMatrix from "../service/LifeMatrix";
import Matrix from "./Matrix";
import lifeConfig from '../config/life-game-config.json'
import { getRandomMatrix } from "../Util/random";
const {dimension, tick} = lifeConfig;

const LifeGame: React.FC = () => {
const lifeMatrix = useRef<LifeMatrix>();
const[numbers,setNumbers] = useState<number[][]>([]);
function tickFn():void {
    if(!lifeMatrix.current) {
        lifeMatrix.current = new LifeMatrix(getRandomMatrix(dimension, dimension, 0 ,2));
        // [
        //     [0,0,0,0,0],
        //     [0,0,1,0,0],
        //     [0,0,1,0,0],
        //     [0,0,1,0,0],
        //     [0,0,0,0,0]
        // ])
        setNumbers(lifeMatrix.current.numbers)
    } else {
        setNumbers(lifeMatrix.current.next())
    }
}
useEffect(() => {
    const intervalId = setInterval(tickFn, tick);
    return () => clearInterval(intervalId);
},[])
return <Matrix matrix = {numbers}/>
}
export default LifeGame;