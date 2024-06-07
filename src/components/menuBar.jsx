import React from "react"

function MenuBar() {
    
  return (
    <>
      <div className="flex flex-col w-1/6 min-w-44 h-auto bg-white text-black border-0 rounded-tr-3xl rounded-br-3xl p-6">
      <a href="#logo.png" className="mb-3 self-center">
        <img src={"logo.png"} alt="Logo" className="w-20" />
      </a>
      <ul>
        <button className="text-lg text-left font-normal w-full bg-white border-0 rounded-2xl hover:bg-amber-300 hover:font-bold transition-colors duration-300 focus:bg-amber-300 focus:font-bold mb-2 pl-4 py-3">Employees</button>
        <button className="text-lg text-left font-normal w-full bg-white border-0 rounded-2xl hover:bg-amber-300 hover:font-bold transition-colors duration-300 focus:bg-amber-300 focus:font-bold mb-2 pl-4 py-3">Schedule</button>
        <button className="text-lg text-left font-normal w-full bg-white border-0 rounded-2xl hover:bg-amber-300 hover:font-bold transition-colors duration-300 focus:bg-amber-300 focus:font-bold mb-2 pl-4 py-3">Menus</button>
        <button className="text-lg text-left font-normal w-full bg-white border-0 rounded-2xl hover:bg-amber-300 hover:font-bold transition-colors duration-300 focus:bg-amber-300 focus:font-bold mb-2 pl-4 py-3">Stock</button>
        <button className="text-lg text-left font-normal w-full bg-white border-0 rounded-2xl hover:bg-amber-300 hover:font-bold transition-colors duration-300 focus:bg-amber-300 focus:font-bold mb-2 pl-4 py-3">Summary</button>
      </ul>
    </div>
    </>
  )
}

export default MenuBar
