import './App.css'
// import Header from './components/header'
import MenuBar from './components/menuBar'
import Summary from './pages/Summary/AllSummary'
import Schedule from './pages/Schedule/AllSchedule'

import AllEmployee from './pages/Employee/AllEmployee'
import AllMenu from './pages/Menu/AllMenu'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AllStock from './pages/Stock/AllStock'
function App() {
  return (
    <Router>
      <div className="flex">
        <MenuBar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<AllEmployee />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/menus" element={<AllMenu />} />
            <Route path="/stock" element={<AllStock />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
