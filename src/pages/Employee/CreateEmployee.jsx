import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../lib/axiosInstance";

const CreateEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeID: '',
    position: '',
    firstName: '',
    lastName: '',
    nickName: '',
    dateOfBirth: '',
    gender: 'Male',
    identificationNumber: '',
    location: '',
    email: '',
    phone: '',
    startDate: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const positions = ['Chef', 'Waiter', 'Waitress', 'Cashier'];
  const gender = ['Male', 'Female', 'Other'];

  useEffect(() => {
    const fetchNextEmployeeID = async () => {
      try {
        const response = await axiosInstance.get('/api/employee/nextEmployeeID');
        setFormData((prevFormData) => ({
          ...prevFormData,
          employeeID: response.data.nextEmployeeID
        }));
      } catch (error) {
        console.error('Error fetching next employee ID:', error);
      }
    };

    fetchNextEmployeeID();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.position) errors.position = "Position is required";
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.nickName) errors.nickName = "Nickname is required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.identificationNumber) errors.identificationNumber = "Identification number is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบ validation ของฟอร์ม
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setServerError(null);
      await axiosInstance.post('/api/employee/createEmployee', formData);
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        console.error('Error creating employee:', error);
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
          <h3 className="text-2xl font-bold">Create New Profile</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Number</label>
                <input
                  type="text"
                  name="employeeID"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.employeeID}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {errors.position && <div className="mt-1 text-red-500 text-sm">{errors.position}</div>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="mt-1 text-red-500 text-sm">{errors.firstName}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="mt-1 text-red-500 text-sm">{errors.lastName}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                  type="text"
                  name="nickName"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.nickName}
                  onChange={handleChange}
                />
                {errors.nickName && <div className="mt-1 text-red-500 text-sm">{errors.nickName}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <div className="mt-1 text-red-500 text-sm">{errors.dateOfBirth}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  {gender.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gender && <div className="mt-1 text-red-500 text-sm">{errors.gender}</div>}
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div>
                <label className="block text-sm font-medium text-gray-700">Identification Number</label>
                <input
                  type="text"
                  name="identificationNumber"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.identificationNumber}
                  onChange={handleChange}
                />
                {errors.identificationNumber && <div className="mt-1 text-red-500 text-sm">{errors.identificationNumber}</div>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <div className="mt-1 text-red-500 text-sm">{errors.location}</div>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="mt-1 text-red-500 text-sm">{errors.email}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="mt-1 text-red-500 text-sm">{errors.phone}</div>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <div className="mt-1 text-red-500 text-sm">{errors.startDate}</div>}
            </div>
            {serverError && <div className="text-red-500 text-center font-semibold mt-2">{serverError}</div>}

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

export default CreateEmployee;
