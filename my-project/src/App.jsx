import Home from "/src/Home.tsx"
import About from "/src/About.tsx";


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

