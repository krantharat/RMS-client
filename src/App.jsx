import './App.css'
// import Header from './components/header'
import MenuBar from './components/menuBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Summary from './pages/Summary/AllSummary'
import Employee from './pages/Employee/AllEmployee'
import Menu from './pages/Menu/AllMenu'
import Schedule from './pages/Schedule/AllSchedule'
import Stock from './pages/Stock/AllStock'

function App() {
  return (
    <>
      <div className="flex">
        <MenuBar/>
        {/* <Header/> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Employee />} />
            <Route path='/Schedule' element={<Schedule />} />
            <Route path='/Menu' element={<Menu />} />
            <Route path='/Stock' element={<Stock />} />
            <Route path='/Summary' element={<Summary />} />        
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
