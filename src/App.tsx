import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigator from "./components/common/Navigator";
import Home from "./components/pages/Home";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import ShoppingCart from "./components/pages/ShoppingCart copy";
import SignIn from "./components/pages/SignIn copy";
import SignOut from "./components/pages/SignOut";
import "./App.css";

const App: React.FC = () => {
  
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigator/>}>
          <Route index element = {<Home/>}/>
          <Route path = "orders" element = {<Orders/>}/>
          <Route path = "products" element = {<Products/>}/>
          <Route path = "shoppingcart" element = {<ShoppingCart/>}/>
          <Route path = "signin" element = {<SignIn/>}/>
          <Route path = "signout" element = {<SignOut/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
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