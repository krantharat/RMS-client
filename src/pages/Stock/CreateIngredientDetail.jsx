import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const CreateIngredient = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name:'',
    category:'',
    uom:'',
    cost:'',
    price:'',
    lowAmount:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Create New Ingredient</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Meat">Meat</option>
                <option value="Fruit">Fruit</option>
                <option value="Seafood">Seafood</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit of Measure</label>
              <select
                name="uom"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.uom}
                onChange={handleChange}
              >
                <option value="kg">kg</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="text"
                name="cost"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Low Amount of Ingredients</label>
              <input
                type="text"
                name="lowAmount"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.lowAmount}
                onChange={handleChange}

              />
            </div>

            <div className="flex flex-col">
              <div className='flex justify-center mt-2'>
                <button
                  type="submit"
                  className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                >Save
                </button>
                <button
                  type="button"
                  className="w-20 bg-red-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-red-700 transition duration-300"
                  onClick={handleCancel}
                >Cancel
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

export default CreateIngredient;
