import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from '../../lib/axiosInstance';

const DeleteIngredient = ({ selectedIngredient, onClose, onConfirm }) => {
  const [ingredient, setIngredient] = useState(selectedIngredient);

  useEffect(() => {
    const fetchIngredientDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/stock/searchIngredient?name=${selectedIngredient.ingredientName}`);
        setIngredient(response.data);
      } catch (err) {
        console.error('Error fetching ingredient details:', err);
      }
    };
    fetchIngredientDetail();
  }, [selectedIngredient]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const closeModal = () => {
    onClose();
    window.location.href = '/Stock';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Are you sure you want to delete this ingredient?</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
            <form className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="ingredientName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={ingredient.ingredientName}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="ingredientCategory"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={ingredient.ingredientCategory}
                  readOnly
                />
              </div>  
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit of Measure</label>
                <input
                  type="text"
                  name="uomType"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={ingredient.uomType}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cost</label>
                <input
                  type="text"
                  name="cost"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={ingredient.cost}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Low Amount of Ingredients</label>
                <input
                  type="text"
                  name="notiAmount"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={ingredient.notiAmount}
                  readOnly
                />
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

export default DeleteIngredient;
