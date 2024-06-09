import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from '../../lib/axiosInstance';

const DeleteMenu = ({ selectedMenu, onClose, onConfirm }) => {
  const [menu, setMenu] = useState({ ...selectedMenu });

  const menuCategory = ['appetizer','main dish', 'soup', 'salad', 'drinks', 'dessert']

  useEffect(() => {
    setMenu({ ...selectedMenu });
  }, [selectedMenu]);

  const handleConfirm = async () => {
    try {
      const url = `/api/menu/deleteMenu/${menu._id}`;
      await axiosInstance.delete(url);
      console.log(`DEL request URL: ${url}`);
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCancel = () => {
    setMenu({ ...selectedMenu });
    onClose();
  };

  const closeModal = () => {
    onClose();
    window.location.href = '/Menu';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Are you sure you want to delete this menu?</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Menu Name</label>
                  <input
                    type="text"
                    name="menuName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.menuName}
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                      value={menu.menuCategory}
                      disabled
                    >
                      {menuCategory.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.price}
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Cost</label>
                  <input
                    type="text"
                    name="cost"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.cost}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-4 flex justify-center items-center">
              <div className="relative w-full h-full">
                  {menu.image && (
                    <img src={menu.image} alt="Menu" className="w-full h-full object-cover rounded-md" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className='flex justify-center mt-2'>
                <button
                  type="button"
                  className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="w-20 bg-red-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-red-700 transition duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
          onClick={closeModal}
        >
          <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
        </button>
      </div>
    </div>
  );
};

export default DeleteMenu;
