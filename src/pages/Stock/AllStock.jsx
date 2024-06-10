import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { FaEdit } from "react-icons/fa";
import { axiosInstance } from "../../lib/axiosInstance";
import CreateIngredient from "./CreateIngredientDetail";
import ViewIngredientDetail from "./ViewIngredientDetail";

function AllStock() {
  const [currentDate, setCurrentDate] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [createIngredient, setCreateIngredient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
const toggleUpdateMode = () => {
  setIsUpdateMode(!isUpdateMode);
};


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
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleClickCreate = () => {
    setCreateIngredient(true);
  };

  const handleViewIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleClose = () => {
    setSelectedIngredient(null);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
    setCreateIngredient(false);
  };

  const handleDeleteIngredient = () => {
    setIngredients(ingredients.filter(ingredient => ingredient !== selectedIngredient));
    setSelectedIngredient(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleUpdateMode = () => {
    setIsUpdateMode(!isUpdateMode);
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
            {/* <div className="flex items-center ml-5">
              <h2 className="text-xl font-medium">
                The data on
                <input
                  type="date"
                  className="w-52 bg-transparent focus:outline-none text-3xl font-semibold ml-5"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
              </h2>
            </div> */}
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
                onClick={toggleUpdateMode}
              >
                {isUpdateMode ? 'Cancel Update' : 'Update'}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col p-5">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead>
              <tr>
                {isUpdateMode && <th className="py-2 px-3 border-b text-center">Select</th>}
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
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIngredient && (
        <ViewIngredientDetail 
          selectedIngredient={selectedIngredient} 
          onClose={handleClose} 
          onConfirmDelete={handleDeleteIngredient}
        />
      )}

      {createIngredient && (
        <CreateIngredient onClose={closeModal} onSave={fetchIngredient} />
      )}
    </>
  );
}

const IngredientRow = ({ ingredient, onClickEdit }) => {
  const { ingredientName, ingredientCategory, date, inStock, uomType, cost, notiAmount } = ingredient;

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

  return (
    <tr>
      {isUpdateMode && (
        <td className="py-2 px-3 border-b text-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
        </td>
      )}
      <td className={`py-2 px-3 border-b font-medium cursor-pointer ${getStockClass()}`} onClick={onClickEdit}>
        {ingredientName}
      </td>
      <td className={`py-2 px-3 border-b font-medium ${getStockClass()}`}>
        {ingredientCategory}
      </td>
      <td className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}>
        {date}
      </td>
      <td className={`py-2 px-3 border-b font-medium text-center ${getStockClass()}`}>
        {inStock}
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
