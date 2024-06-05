import './App.css'
import Header from './components/header'
import MenuBar from './components/menuBar'

function App() {
  return (
    <>
      <div className="flex">
        <MenuBar/>
        <Header/>
      </div>
    </>
  )
}

export default App
