import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const DeleteMenu = ({ selectedMenu, onClose, onConfirm }) => {
  const [menu] = useState(selectedMenu);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
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
                  <input
                    type="text"
                    name="menuCategory"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.menuCategory}
                    readOnly
                  />
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
          onClick={onClose}
        >
          <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
        </button>
      </div>
    </div>
  );
};

export default DeleteMenu;
