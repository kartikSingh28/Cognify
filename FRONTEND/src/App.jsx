import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./Pages/Home";
import "./App.css";



function Reminders() {
  return <div className="pt-20 text-center text-lg">Reminders Page</div>;
}
function Mood() {
  return <div className="pt-20 text-center text-lg">Mood Tracker</div>;
}
function Family() {
  return <div className="pt-20 text-center text-lg">Family Section</div>;
}

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/family" element={<Family />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
