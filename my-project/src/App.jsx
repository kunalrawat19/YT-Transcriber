import Home from "./Home.tsx"
import About from "./About.tsx";
import Instructions from "./instructions.tsx";

import { BrowserRouter,Route,Routes } from "react-router-dom";



function App() {
  
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>} />
        <Route path="/instructions" element={<Instructions/>}/>
      </Routes>
    </>
  );
}

export default App;

