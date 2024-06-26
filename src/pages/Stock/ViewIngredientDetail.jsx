import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import DeleteIngredient from './DeleteIngredient';
import { axiosInstance } from '../../lib/axiosInstance';

const ViewIngredientDetail = ({ selectedIngredient, onClose, onConfirmDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [ingredient, setIngredient] = useState({ ...selectedIngredient });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const uomType = ['g', 'kg', 'ml', 'l', 'pack'];
  const ingredientCategory = ['meat', 'seafood', 'fruit', 'vegetable'];

  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIngredient({ ...selectedIngredient });
  }, [selectedIngredient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient(prevState => ({
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

  const validate = () => {
    const validationErrors = {};
    if (ingredient.ingredientName.trim() === '') {
      validationErrors.ingredientName = 'Ingredient name is required';
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false); 
      return;
    }

    try {
      setServerError(null);
      await axiosInstance.put(`/api/stock/editIngredient/${ingredient._id}`, ingredient);
      setIsEditable(false);
      // onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message); // ตั้งค่าข้อผิดพลาดจากเซิร์ฟเวอร์
      } else {
        setServerError('Error updating ingredient. Please try again.');
      }
      console.error('Error updating ingredient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIngredient({ ...selectedIngredient });
    setIsEditable(false);
    onClose();
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Ingredient</h3>
          {!isEditable && (
            <FaEdit
              className="size-6 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ml-3"
              onClick={handleEditClick}
            />
          )}
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="ingredientName"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={ingredient.ingredientName}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="ingredientCategory"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={ingredient.ingredientCategory}
                onChange={handleChange}
                disabled={!isEditable}
              >
                <option value="" disabled>Select a category</option>
                {ingredientCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit of Measure</label>
              <select
                name="uomType"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={ingredient.uomType}
                onChange={handleChange}
                disabled={!isEditable}
              >
                <option value="" disabled>Select a unit of measure</option>
                {uomType.map((uom) => (
                  <option key={uom} value={uom}>
                    {uom}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                name="cost"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={ingredient.cost}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Low Amount of Ingredients</label>
              <input
                type="text"
                name="notiAmount"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={ingredient.notiAmount}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            {errors.ingredientName && <div className="text-red-500 font-medium text-center mt-1 mb-2">{errors.ingredientName}</div>}
            
            {serverError && <div className="text-red-500 text-center font-semibold mt-2">{serverError}</div>}

            {isEditable && (
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-fit text-red-500 text-sm font-medium capitalize border-0 rounded-3xl p-1 hover:text-red-700 hover:underline transition duration-300"
                    onClick={handleDeleteClick}
                  >
                    Delete Ingredient
                  </button>
                </div>
                <div className='flex justify-center mt-2'>
                  <button
                    type="submit"
                    className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
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
        <DeleteIngredient selectedIngredient={selectedIngredient} onClose={closeDeleteModal} onConfirm={onConfirmDelete} />
      )}
    </div>
  );
};

ViewIngredientDetail.propTypes = {
  selectedIngredient: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default ViewIngredientDetail;
