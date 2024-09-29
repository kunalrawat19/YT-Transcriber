import Home from "./Home.tsx"
import About from "./About.tsx";


import { BrowserRouter,Route,Routes } from "react-router-dom";



function App() {
  
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About/>} />
        
      </Routes>
    </>
  );
}

export default App;

