import { useEffect} from "react"
import LifeGame from "./components/LifeGame";
import { useDispatch } from "react-redux";
import { sizeActions } from "./redux/slices/cellSizeSlice";
import { directionActions } from "./redux/slices/flexDirectionSlice";
import Lifes from "./components/Lifes";

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(sizeActions.setSize());
      dispatch(directionActions.setDirection())
    })
  }, [])
  return <div><Lifes/> 
  </div>
}
export default App;



//https://www.youtube.com/watch?v=9KJxaFHotqI   19:18//
// import { useState } from "react";

// function computeInitialState()  {
//   const res = Math.floor(Math.random() * 10);
//   console.log(`inintial value:${res}`);
//   return res;
// } 

// const App: React.FC = () => {

// const[counter,setCounter] = useState(() => computeInitialState());
//     function inc () {
//      setCounter(prev => prev + 2);
//     }

//     function dec () {
//       setCounter(prev => prev - 2);
//      }

//   return (
//     <div>
//       <h1>Counter: {counter}</h1>
//       <button onClick={inc} className="btn btn-success">Increment</button>
//       <button onClick={dec} className="btn btn-danger">Decrement</button>
//     </div>

//   )
// }
// export default App;