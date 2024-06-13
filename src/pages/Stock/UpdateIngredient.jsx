import React from "react";
import { format } from 'date-fns';
import { IoMdCloseCircle } from "react-icons/io";

const UpdateIngredient = ({
  isOpen,
  onClose,
  selectedIngredients,
  onQuantityChange,
  updateQuantities,
  handleUpdateClick,
}) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'dd MMMM yyyy');
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Invalid Date';
    }
  };

  const getStockClass = (inStock, notiAmount) => {
    if (inStock === 0) {
      return "text-red-500";
    } else if (inStock < notiAmount) {
      return "text-red-500";
    } else if (inStock === notiAmount) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Update Ingredients</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-300">
            <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300" />
          </button>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b">Ingredient</th>
                <th className="py-2 px-3 border-b">Category</th>
                <th className="py-2 px-3 border-b text-center">Date</th>
                <th className="py-2 px-3 border-b text-center">In Stock</th>
                <th className="py-2 px-3 border-b text-center">UOM</th>
                <th className="py-2 px-3 border-b text-center">Cost</th>
              </tr>
            </thead>
            <tbody>
              {selectedIngredients.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td
                    className={`py-2 px-3 border-b font-medium ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    {ingredient.ingredientName}
                  </td>
                  <td
                    className={`py-2 px-3 border-b font-medium ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    {ingredient.ingredientCategory}
                  </td>
                  <td
                    className={`py-2 px-3 border-b font-medium text-center ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    {formatDate(ingredient.date)}
                  </td>
                  <td
                    className={`py-2 px-3 border-b font-medium text-center ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    <input
                      type="number"
                      min={0}
                      className="w-20 ml-2 border text-center border-gray-300 rounded"
                      value={updateQuantities[ingredient._id] || ingredient.inStock}
                      onChange={(e) => onQuantityChange(ingredient, e.target.value)}
                    />
                  </td>
                  
                  <td
                    className={`py-2 px-3 border-b font-medium text-center ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    {ingredient.uomType}
                  </td>
                  <td
                    className={`py-2 px-3 border-b font-medium text-center ${getStockClass(ingredient.inStock, ingredient.notiAmount)}`}
                  >
                    {ingredient.cost} THB
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-2 p-4 border-t">
          <button
            onClick={handleUpdateClick}
            className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl p-2 hover:bg-green-700 transition duration-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="w-20 bg-red-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateIngredient;
