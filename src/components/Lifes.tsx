import { useDispatch } from "react-redux";
import { useSelectorDirection } from "../redux/store"
import { countActions } from "../redux/slices/lifesCountSlice";
import { ReactNode, useEffect } from "react";
import LifeGame from "./LifeGame";

const Lifes: React.FC = () => { 
    const count = 1;
       
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(count));
    },[])
 const flexDirection = useSelectorDirection();   
    return <section style = {{display: 'flex', flexDirection,
    alignItems:'center', justifyContent: 'space-around', height: '100vh' }}>
      <LifeGame/>
    </section>
}
export default  Lifes;