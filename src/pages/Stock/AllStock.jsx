import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { axiosInstance } from "../../lib/axiosInstance";
import { format } from 'date-fns';
import CreateIngredient from "./CreateIngredientDetail";
import ViewIngredientDetail from "./ViewIngredientDetail";
import UpdateIngredient from './UpdateIngredient';

function AllStock() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [createIngredient, setCreateIngredient] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [updateQuantities, setUpdateQuantities] = useState({});

  const fetchIngredient = async () => {
    try {
      const response = await axiosInstance.get("/api/stock/allIngredient");
      setIngredients(response.data);
    } catch (error) {
      console.error("Error getting ingredients:", error);
    }
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  const handleViewIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleClickCreate = () => {
    setCreateIngredient(true);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
    setCreateIngredient(false);
  };

  const handleDeleteIngredient = async () => {
    try {
      await axiosInstance.delete(`/api/stock/deleteIngredient/${selectedIngredient._id}`);
      console.log("Ingredient deleted:", selectedIngredient);
      setIngredients(
        ingredients.filter((ingredient) => ingredient._id !== selectedIngredient._id)
      );
      setSelectedIngredient(null);
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const handleUpdateClick = () => {
    if (isUpdateMode) {
      updateIngredientQuantities();
    }
    setIsUpdateMode(!isUpdateMode);
  };

  const handleQuantityChange = (ingredient, quantity) => {
    setUpdateQuantities({
      ...updateQuantities,
      [ingredient._id]: quantity,
    });
  };

  const updateIngredientQuantities = async () => {
    try {
      const updatedIngredients = selectedIngredients.map((ingredient) => ({
        ...ingredient,
        inStock: updateQuantities[ingredient._id],
      }));

      await Promise.all(
        updatedIngredients.map((ingredient) =>
          axiosInstance.put(`/api/stock/updateIngredient/${ingredient._id}`, {
            inStock: ingredient.inStock,
          })
        )
      );

      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) =>
          updateQuantities[ingredient._id]
            ? { ...ingredient, inStock: updateQuantities[ingredient._id], date: new Date() }
            : ingredient
        )
      );
      setSelectedIngredients([]);
      setUpdateQuantities({});
      setIsUpdateMode(false);
    } catch (error) {
      console.error("Error updating ingredients:", error);
    }
  };
  

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.ingredientName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Stock" />

        <div>
          <form className="flex flex-wrap justify-between items-center">
            <div className="flex items-center ml-5"></div>
            <div className="flex flex-wrap items-center space-x-3 mr-5 ml-5 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Search ingredient by name"
                className="w-96 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                type="button"
                className="w-24 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl p-2 hover:bg-yellow-600 transition duration-300 mt-2 md:mt-0"
                onClick={handleClickCreate}
              >
                Create
              </button>
              <button
                type="button"
                className="w-24 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl p-2 hover:bg-green-600 transition duration-300 mt-2 md:mt-0"
                onClick={() => setIsUpdateMode(true)}
              >
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col p-5">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b text-center">Select</th>
                <th className="py-2 px-3 border-b">Ingredient</th>
                <th className="py-2 px-3 border-b">Category</th>
                <th className="py-2 px-3 border-b text-center">Date</th>
                <th className="py-2 px-3 border-b text-center">In Stock</th>
                <th className="py-2 px-3 border-b text-center">UOM</th>
                <th className="py-2 px-3 border-b text-center">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((ingredient, index) => (
                <IngredientRow
                  key={index}
                  ingredient={ingredient}
                  onClickEdit={() => handleViewIngredient(ingredient)}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedIngredients.includes(ingredient)}
                  isUpdateMode={isUpdateMode}
                  onQuantityChange={handleQuantityChange}
                  updateQuantities={updateQuantities}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIngredient && (
        <ViewIngredientDetail
          selectedIngredient={selectedIngredient}
          onClose={closeModal}
          onConfirmDelete={handleDeleteIngredient}
        />
      )}

      {createIngredient && <CreateIngredient onClose={closeModal} />}

      <UpdateIngredient
        isOpen={isUpdateMode}
        onClose={() => setIsUpdateMode(false)}
        selectedIngredients={selectedIngredients}
        onQuantityChange={handleQuantityChange}
        updateQuantities={updateQuantities}
        handleUpdateClick={updateIngredientQuantities}
      />
    </>
  );
}

const IngredientRow = ({
  ingredient,
  onClickEdit,
  onCheckboxChange,
  isSelected,
  isUpdateMode,
  onQuantityChange,
  updateQuantities,
}) => {
  const {
    _id,
    ingredientName,
    ingredientCategory,
    date,
    inStock,
    uomType,
    cost,
    notiAmount,
  } = ingredient;

  const getStockClass = () => {
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

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'dd MMMM yyyy');
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Invalid Date';
    }
  };

  return (
    <tr>
      <td className="py-2 px-3 border-b text-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600"
          checked={isSelected}
          onChange={() => onCheckboxChange(ingredient)}
        />
      </td>
      <td
        className={`py-2 px-3 border-b font-medium cursor-pointer ${getStockClass()}`}
        onClick={onClickEdit}
      >
        {ingredientName}
      </td>
      <td className={`py-2 px-3 border-b font-medium ${getStockClass()}`}>
        {ingredientCategory}
      </td>
      <td
        className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}
      >
        {formatDate(date)}
      </td>
      <td
        className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}
      >
        {isUpdateMode ? (
          <input
            type="number"
            className="w-20 ml-2 border text-center border-gray-300 rounded"
            value={updateQuantities[_id] || inStock}
            onChange={(e) => onQuantityChange(ingredient, e.target.value)}
          />
        ) : (
          inStock
        )}
      </td>
      <td className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}>
        {uomType}
      </td>
      <td className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}>
        {cost} THB
      </td>
    </tr>
  );
};

export default AllStock;
