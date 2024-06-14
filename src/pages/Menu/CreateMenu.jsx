import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../lib/axiosInstance";

const CreateMenu = ({ onClose }) => {
  const [formData, setFormData] = useState({
    menuName: '',
    menuCategory: '',
    price: '',
    cost: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const menuCategory = ['appetizer','main dish', 'soup', 'salad', 'drinks', 'dessert'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.menuName) newErrors.menuName = 'Menu name is required';
    if (!formData.menuCategory) newErrors.menuCategory = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.cost) newErrors.cost = 'Cost is required';
    if (!formData.image) newErrors.image = 'Image is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await axiosInstance.post('/api/menu/createMenu', formData);
        onClose();
      } catch (error) {
        console.error('Error creating menu:', error);
      }
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Create New Menu</h3>
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
                    value={formData.menuName}
                    onChange={handleChange}
                  />
                  {errors.menuName && <p className="text-red-500 text-xs mt-2">{errors.menuName}</p>}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="menuCategory"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={formData.menuCategory}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    {menuCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.menuCategory && <p className="text-red-500 text-xs mt-2">{errors.menuCategory}</p>}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-2">{errors.price}</p>}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Cost</label>
                  <input
                    type="text"
                    name="cost"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                    value={formData.cost}
                    onChange={handleChange}
                  />
                  {errors.cost && <p className="text-red-500 text-xs mt-2">{errors.cost}</p>}
                </div>
              </div>
              <div className="mb-4 flex justify-center items-center">
                <div className="relative max-h-96 w-full h-80 flex items-center justify-center">
                  {formData.image && (
                    <img src={formData.image} alt="Menu" className="w-full h-full object-cover rounded-md" />
                  )}
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
                  
                </div>
                
              </div>
            </div>

            <div className="flex flex-col">
              <div className='flex justify-center'>
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

export default CreateMenu;
