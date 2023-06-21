import { useEffect, useRef, useState } from "react";
import LifeMatrix from "../service/LifeMatrix";
import Matrix from "./Matrix";
import lifeConfig from '../config/life-game-config.json'
import { getRandomMatrix, getStableMatrix } from "../Util/random";
import { getSystemErrorMap } from "util";
const {dimension, tick} = lifeConfig;

const LifeGame: React.FC = () => {
const lifeMatrix = useRef<LifeMatrix>();
const[numbers,setNumbers] = useState<number[][]>([]);
function tickFn():void {
    if(!lifeMatrix.current) {
        lifeMatrix.current = new LifeMatrix(
        //getStableMatrix(dimension,dimension)
        getRandomMatrix(dimension, dimension, 0 ,2)
        );
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