import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Askai from "./Pages/AskAi/Askai";
import Result from "./Pages/Result/Result";
import History from "./Pages/History/History";
import Tools from "./Pages/Tools/Tools";
import ToolDetail from "./Pages/Tools/ToolDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/askai" element={<Askai />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          <Route path="/result/:sessionId" element={<Result />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
