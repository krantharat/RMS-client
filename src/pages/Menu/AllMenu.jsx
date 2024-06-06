import React from "react"
import Header from "../../components/header"
import { FaEdit } from "react-icons/fa";

function Menu() {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Menu" />

        <div>
          <form className="flex justify-end mr-5">
            <input 
              type="text" 
              placeholder="Search menu by name" 
              className="w-4/12 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
            <button type="submit" className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-yellow-600 transition duration-300">Create</button>
          </form>
        </div>

        <div className="flex flex-col p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <MenuCard name="Pork Chop" price="250" imageUrl="https://i.pinimg.com/736x/d9/4c/24/d94c242bc50c07e10192071c8b99cafd.jpg" />
            <MenuCard name="Grilled Salmon" price="300" imageUrl="https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg" />
            <MenuCard name="Caesar Salad" price="150" imageUrl="https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg" />
            <MenuCard name="Chocolate Cake" price="120" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBWB76EZKUgHdARYa-XNyIzoiJiUiyKiFrg&s" />
          </div>
        </div>
      </div>
    </>
  )
}

const MenuCard = ({ name, price, imageUrl }) => (
  <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
    <img src={imageUrl} alt={name} className="w-full h-60 object-cover rounded-lg mb-3" />
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">{name}</h3>
      <FaEdit className="size-5 text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300" />
    </div>
    <p className="text-gray-700">{price} THB</p>
  </div>
);

export default Menu
