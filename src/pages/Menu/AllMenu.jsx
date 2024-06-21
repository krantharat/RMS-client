import React, { useState, useEffect } from 'react';
import Header from "../../components/header";
import CreateMenu from './CreateMenu';
import ViewMenu from './ViewMenu';
import { axiosInstance } from '../../lib/axiosInstance';

function AllMenu() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [createMenu, setCreateMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get('/api/menu/allMenu');
      setMenus(response.data);
    } catch (error) {
      console.error('Error getting menus:', error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

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
    setMenus(menus.filter(menu => menu._id !== selectedMenu._id));
    setSelectedMenu(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenus = menus.filter(
    (menu) =>
      menu.menuName.toLowerCase().startsWith(searchTerm.toLowerCase())
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
            { filteredMenus.map((item, index) => (
                <div key={index} className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer"
                  onClick={()=> handleCardClick(item)}>
                  <div>
                    <img src={item.image} alt={item.menuName} className="w-full h-60 object-cover rounded-lg mb-3" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">{item.menuName}</h3>
                  </div>
                  <p className='flex flex-row text-black'>Priced at <span className="font-medium text-green-500 ml-3">{item.price} THB</span></p>
                </div>
              ))
            }
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
  );
}

export default AllMenu;
