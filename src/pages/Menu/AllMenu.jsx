import React, { useState } from 'react';
import Header from "../../components/header";
import { FaEdit } from "react-icons/fa";
import CreateMenu from './CreateMenu';
import ViewMenu from './ViewMenu';

function AllMenu() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [createMenu, setCreateMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menus = [
    {
      menuName: 'Spaghetti Carbonara',
      menuCategory: 'Main Course',
      price: '12.99',
      cost: '8.50',
      image: "https://i.pinimg.com/736x/d9/4c/24/d94c242bc50c07e10192071c8b99cafd.jpg"
    },
    {
      menuName: "Grilled Salmon",
      menuCategory: 'Main Course',
      price: '12.99',
      cost: '8.50',
      image: "https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg"
    },
    {
      menuName: "Caesar Salad",
      menuCategory: 'Main Course',
      price: '12.99',
      cost: '8.50',
      image: "https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"
    },
    {
      menuName: "Chocolate Cake",
      menuCategory: 'Dessert',
      price: '12.99',
      cost: '8.50',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBWB76EZKUgHdARYa-XNyIzoiJiUiyKiFrg&s"
    }
  ];

  const handleCardClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleClickCreate = () => {
    setCreateMenu(true);
  };

  const closeModal = () => {
    setSelectedMenu(null);
    setCreateMenu(false);
  };

  const handleDeleteMenu = () => {
    console.log("Menu deleted:", selectedMenu);
    setSelectedMenu(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenus = menus.filter(
    (menu) =>
      menu.menuName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      menu.menuCategory.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Menu" />

        <div>
          <form className="flex justify-end mr-5">
            <input 
              type="text" 
              placeholder="Search menu by name" 
              className="w-4/12 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button 
              type="button" 
              className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-yellow-600 transition duration-300"
              onClick={handleClickCreate}
            >
              Create
            </button>
          </form>
          {createMenu && (
            <CreateMenu onClose={closeModal} />
          )}
        </div>

        <div className="flex flex-col p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMenus.map((menu, index) => (
              <MenuCard 
                key={index}
                {...menu}
                onClick={() => handleCardClick(menu)} 
              />
            ))}
          </div>
        </div>

        {selectedMenu && (
          <ViewMenu 
            selectedMenu={selectedMenu} 
            onClose={closeModal}
            onConfirmDelete={handleDeleteMenu}
          />
        )}
      </div>
    </>
  )
}

const MenuCard = ({ menuName, price, image, onClick }) => (
  <div 
    className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer"
    onClick={onClick}
  >
    <div>
      <img src={image} alt={menuName} className="w-full h-60 object-cover rounded-lg mb-3" />
    </div>
    
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">{menuName}</h3>
    </div>
    <p className='flex flex-row text-black'>Priced at <p className="font-medium text-green-500 ml-3">{price} THB</p></p>

  </div>
);

export default AllMenu;
