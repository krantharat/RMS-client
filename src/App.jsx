import './App.css'
// import Header from './components/header'
import MenuBar from './components/menuBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Summary from './pages/Summary/AllSummary'
import Employee from './pages/Employee/AllEmployee'

function App() {
  return (
    <>
      <div className="flex">
        <MenuBar/>
        {/* <Header/> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Employee />} />
            <Route path='/Summary' element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
