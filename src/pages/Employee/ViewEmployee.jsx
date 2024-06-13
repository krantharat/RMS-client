import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import DeleteEmployee from './DeleteEmployee';
import { axiosInstance } from '../../lib/axiosInstance';

const ViewEmployee = ({ selectedEmployee, onClose, onConfirmDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [employee, setEmployee] = useState({ ...selectedEmployee });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const positions = ['Chef', 'Waiter', 'Waitress', 'Cashier'];
  const gender = ['Male', 'Female', 'Other'];

  useEffect(() => {
    setEmployee({ ...selectedEmployee });
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(`Submitting update for employee ID: ${employee._id}`);
      const url = `/api/employee/editEmployee/${employee._id}`;
      console.log(`PUT request URL: ${url}`);
      await axiosInstance.put(url, employee);
      setIsEditable(false);
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee');
    } finally {
      setIsLoading(false);
    }
};


  const handleCancel = () => {
    setEmployee({ ...selectedEmployee });
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
          <h3 className="text-2xl font-bold">Profile</h3>
          {!isEditable && (
            <FaEdit
              className="size-6 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ml-3"
              onClick={handleEditClick}
            />
          )}
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          {error && <div className="text-red-500">{error}</div>}
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Number</label>
                <input
                  type="text"
                  name="employeeID"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.employeeID}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.position}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.firstName}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.lastName}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                  type="text"
                  name="nickName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.nickName}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.dateOfBirth}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.gender}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  {gender.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <label className="block text-sm font-medium text-gray-700">Identification Number</label>
                <input
                  type="text"
                  name="identificationNumber"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.identificationNumber}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={employee.location}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.email}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.phone}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                name="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={employee.startDate}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            {isEditable && (
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-28 text-red-500 text-sm font-medium capitalize border-0 rounded-3xl p-1 hover:text-red-700 hover:underline transition duration-300"
                    onClick={handleDeleteClick}
                  >
                    Delete profile
                  </button>
                </div>
                <div className='flex justify-center mt-2'>
                  <button
                    type="submit"
                    className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
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
        <DeleteEmployee selectedEmployee={selectedEmployee} onClose={closeDeleteModal} onConfirm={onConfirmDelete} />
      )}
    </div>
  );
};

export default ViewEmployee;
