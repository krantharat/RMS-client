import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { FaEdit } from "react-icons/fa";

import CreateIngredient from "./CreateIngredientDetail";
import ViewIngredientDetail from "./ViewIngredientDetail";

function AllStock() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [createIngredient, setCreateIngredient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [ingredients, setIngredients] = useState([
    { name: "Flour", category: "Bakery", date: "2024-06-01", instock: "20", uom: "kg", cost: "20" },
    { name: "Sugar", category: "Sweeteners", date: "2024-06-05", instock: "50", uom: "kg", cost: "15" },
    { name: "Butter", category: "Dairy", date: "2024-06-03", instock: "0", uom: "kg", cost: "50" },
    { name: "Eggs", category: "Dairy", date: "2024-06-02", instock: "0", uom: "dozen", cost: "30" },
  ]);

  useEffect(() => {
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

  const handleSaveIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const filteredIngredient = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUpdateMode = () => {
    setIsUpdateMode(!isUpdateMode);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Stock" />

        <div>
          <form className="flex flex-wrap justify-between items-center">
            <div className="flex items-center ml-5">
              <h2 className="text-xl font-medium">
                The data on
                <input
                  type="date"
                  className="w-52 bg-transparent focus:outline-none text-3xl font-semibold ml-5"
                  defaultValue={currentDate}
                />
              </h2>
            </div>
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
                Update
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
                <th className="py-2 px-3 border-b text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredient.map((ingredient, index) => (
                <IngredientRow key={index} {...ingredient} isUpdateMode={isUpdateMode} onClick={() => handleViewIngredient(ingredient)} />
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
        <CreateIngredient onClose={closeModal} onSave={handleSaveIngredient} />
      )}
    </>
  );
}

const IngredientRow = ({ name, category, date, instock, uom, cost, onClick, isUpdateMode }) => (
  <tr>
    {isUpdateMode && <td className="py-2 px-3 border-b text-center"><input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" /></td>}
    <td className={`py-2 px-3 border-b font-medium cursor-pointer ${instock === "0" ? "text-red-500" : "text-green-500" }`} onClick={onClick}>{name}</td>
    <td className={`py-2 px-3 border-b font-medium ${instock === "0" ? "text-red-500" : "text-green-500"}`}>{category}</td>
    <td className={`py-2 px-3 border-b font-medium text-center ${instock === "0" ? "text-red-500" : "text-green-500"}`}>{date}</td>
    <td className={`py-2 px-3 border-b font-medium text-center ${instock === "0" ? "text-red-500" : "text-green-500"}`}>{instock}</td>
    <td className={`py-2 px-3 border-b font-medium text-center ${instock === "0" ? "text-red-500" : "text-green-500"}`}>{uom}</td>
    <td className={`py-2 px-3 border-b font-medium text-center ${instock === "0" ? "text-red-500" : "text-green-500"}`}>{cost} THB</td>
    <td className="py-2 px-3 border-b text-center">
      <div className="flex justify-center">
        <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300" />
      </div>
    </td>
  </tr>
);

export default AllStock;
