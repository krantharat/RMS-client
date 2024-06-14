import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../lib/axiosInstance";

const DeleteEmployee = ({ selectedEmployee, onClose, onConfirm }) => {
  const [employee, setEmployee] = useState({ ...selectedEmployee });

  const positions = ['Chef', 'Waiter', 'Waitress', 'Cashier'];
  const gender = ['Male', 'Female', 'Other'];

  useEffect(() => {
    setEmployee({ ...selectedEmployee });
  }, [selectedEmployee]);

  const handleConfirm = async () => {
    try {
      const url = `/api/employee/deleteEmployee/${employee._id}`;
      await axiosInstance.delete(url);
      console.log(`DEL request URL: ${url}`);
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCancel = () => {
    setEmployee({ ...selectedEmployee });
    onClose();
  };

  const closeModal = () => {
    onClose();
    // window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Are you sure you want to delete this profile?</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Number</label>
                <input
                  type="text"
                  name="employeeID"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.employeeID}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.position}
                  readOnly
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
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.lastName}
                  readOnly
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
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.dateOfBirth}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="position"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.gender}
                  readOnly
                >
                  {gender.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
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
                  readOnly
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
                readOnly
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
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={employee.phone}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={employee.startDate}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <div className='flex justify-center mt-2'>
                <button
                  type="button"
                  className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                  onClick={handleConfirm}
                >
                  Confirm
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
          onClick={closeModal}
        >
          <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
