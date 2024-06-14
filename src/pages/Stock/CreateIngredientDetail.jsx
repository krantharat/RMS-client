import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../lib/axiosInstance";

const CreateIngredient = ({ onClose }) => {
  const [formData, setFormData] = useState({
    ingredientName: '',
    ingredientCategory: '',
    date: '',
    inStock: 0,
    uomType: '',
    cost: '',
    notiAmount: ''
  });

  const [errors, setErrors] = useState({});

  const uomType = ['g', 'kg', 'ml', 'l', 'pack'];
  const ingredientCategory = ['meat', 'seafood', 'fruit', 'vegetable'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.ingredientName) errors.ingredientName = "Ingredient name is required";
    if (!formData.ingredientCategory) errors.ingredientCategory = "Category is required";
    if (!formData.uomType) errors.uomType = "Unit of Measure is required";
    if (!formData.cost) errors.cost = "Cost is required";
    if (!formData.notiAmount) errors.notiAmount = "Low amount notification is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        ...formData,
        date: formData.date || new Date().toISOString().split('T')[0],
        inStock: formData.inStock || 0,
      };
      await axiosInstance.post('/api/stock/createIngredient', payload);
      onClose();
    } catch (error) {
      console.error('Error creating ingredient:', error);
      setErrors({ submit: error.response?.data?.message || 'Error creating ingredient. Please try again.' });
    }
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
                name="ingredientName"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.ingredientName}
                onChange={handleChange}
              />
              {errors.ingredientName && <div className="text-red-500 mt-1">{errors.ingredientName}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="ingredientCategory"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.ingredientCategory}
                onChange={handleChange}
              >
                <option value="" disabled>Select a category</option>
                {ingredientCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.ingredientCategory && <div className="text-red-500 mt-1">{errors.ingredientCategory}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit of Measure</label>
              <select
                name="uomType"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.uomType}
                onChange={handleChange}
              >
                <option value="" disabled>Select a unit of measure</option>
                {uomType.map((uom) => (
                  <option key={uom} value={uom}>
                    {uom}
                  </option>
                ))}
              </select>
              {errors.uomType && <div className="text-red-500 mt-1">{errors.uomType}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                name="cost"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.cost}
                onChange={handleChange}
              />
              {errors.cost && <div className="text-red-500 mt-1">{errors.cost}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Low Amount of Ingredients</label>
              <input
                type="number"
                name="notiAmount"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.notiAmount}
                onChange={handleChange}
              />
              {errors.notiAmount && <div className="text-red-500 mt-1">{errors.notiAmount}</div>}
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
