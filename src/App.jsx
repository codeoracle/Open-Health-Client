import { useState } from "react";
// import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Askai from "./Pages/AskAi/Askai";
import Result from "./Pages/Result/Result";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

 //👇🏻 state holding the result
     const [result, setResult] = useState({});

    return (      
            <BrowserRouter>
            <Navbar/>
            <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/askai' element={<Askai setResult={setResult} />} />
                    <Route path='/result' element={<Result result={result} />} />
                </Routes>
              {/* <Footer/> */}
            </BrowserRouter>
    );
}

export default App
