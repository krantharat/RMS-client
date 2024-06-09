import React, { useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { IoMdCloseCircle } from "react-icons/io";

const UpdateIngredient = ({ selectedIngredients, onClose }) => {
  const [newStockValues, setNewStockValues] = useState(
    selectedIngredients.reduce((acc, ingredient) => {
      acc[ingredient.id] = ingredient.inStock;
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const handleStockChange = (e, id) => {
    const value = e.target.value;
    setNewStockValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "Stock value cannot be negative",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
    }
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedIngredients.map((ingredient) =>
          axiosInstance.put(`/api/stock/ingredient/${ingredient.id}`, {
            inStock: newStockValues[ingredient.id],
          })
        )
      );
      onClose();
    } catch (error) {
      console.error("Error updating ingredient stock:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Update Ingredient Stock</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdateStock}>
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient.id} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {ingredient.ingredientName} ({ingredient.uom}):
                </label>
                <input
                  type="number"
                  value={newStockValues[ingredient.id]}
                  onChange={(e) => handleStockChange(e, ingredient.id)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                />
                {errors[ingredient.id] && (
                  <p className="text-red-500 text-sm mt-1">{errors[ingredient.id]}</p>
                )}
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex justify-center mt-2">
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

export default UpdateIngredient;
