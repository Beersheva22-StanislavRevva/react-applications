import { useDispatch } from "react-redux";
import { useSelectorCount, useSelectorDirection } from "../redux/store"
import { countActions } from "../redux/slices/lifesCountSlice";
import { ReactNode, useEffect, useState } from "react";
import LifeGame from "./LifeGame";
import Input from "./common/Input"
import InputResult from "../model/InputResult";

const Lifes: React.FC = () => { 
    const[fl,setFl] = useState(false);
   
    function inputCheck(inputString:string):InputResult {
        const inputNumber = parseInt(inputString);
        if (inputNumber >= 1 && inputNumber <= 5) {
          dispatch(countActions.setCount(inputNumber))
          setFl(true);
          return {status: "success"};
        } else {
          return{status: "error", message: "please enter from 1 to 5"};
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(0));
    },[])
 const flexDirection = useSelectorDirection();
 const count = useSelectorCount();
 
 if (fl == false) 
    { return <section style = {{display: 'flex', flexDirection,
    alignItems:'center', justifyContent: 'space-around', height: '100vh' }}>
      <Input placeholder="Number of games (1-5)" buttonTitle="Start" type="number" submitFn={inputCheck} />
    </section>}
  else { return <section style = {{display: 'flex', flexDirection,
    alignItems:'center', justifyContent: 'space-around', height: '100vh' }}>
      {Array.from({length: count}).map(_=> <LifeGame/>)}
    </section>
    }
}
export default  Lifes;

