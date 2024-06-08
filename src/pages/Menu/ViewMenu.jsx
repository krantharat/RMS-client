import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import DeleteMenu from './DeleteMenu';

const ViewMenu = ({ selectedMenu, onClose, onConfirmDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [menu, setMenu] = useState({ ...selectedMenu });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleDeleteClick = () => {
    setIsDelete(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditable(false);
    onClose();
  };

  const handleCancel = () => {
    setMenu({ ...selectedMenu });
    setIsEditable(false);
    onClose();
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenu(prevState => ({
          ...prevState,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Menu Details</h3>
          {!isEditable && (
            <FaEdit
              className="size-6 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ml-3"
              onClick={handleEditClick}
            />
          )}
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Menu name</label>
                  <input
                    type="text"
                    name="menuName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.menuName}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="menuCategory"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.menuCategory}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.price}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Cost</label>
                  <input
                    type="text"
                    name="cost"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={menu.cost}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="mb-4 flex justify-center items-center">
                <div className="relative max-h-96 w-full h-80 flex items-center justify-center">
                  {menu.image && (
                    <img src={menu.image} alt="Menu" className="w-full h-full object-cover rounded-md" />
                  )}
                  {isEditable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                      <label className="text-white bg-blue-500 px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition duration-300">
                        Upload image
                        <input
                          type="file"
                          name="image"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditable && (
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-red-500 text-sm font-medium capitalize border-0 rounded-3xl hover:text-red-700 hover:underline transition duration-300"
                    onClick={handleDeleteClick}
                  >
                    Delete Menu
                  </button>
                </div>
                <div className='flex justify-center mt-2'>
                  <button
                    type="submit"
                    className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                  >
                    Save
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
            )}
          </form>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
          onClick={onClose}
        >
          <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
        </button>
      </div>
      {isDelete && (
        <DeleteMenu selectedMenu={selectedMenu} onClose={closeDeleteModal} onConfirm={onConfirmDelete} />
      )}
    </div>
  );
};

export default ViewMenu;
