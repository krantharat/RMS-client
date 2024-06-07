import React, { useState } from "react";
import Header from "../../components/header";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import ViewEmployee from "./ViewEmployee";

function AllEmployee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      employeeID: "E001",
      firstName: "John",
      lastName: "Doe",
      nickName: "Johnny",
      position: "Manager",
      dateOfBirth: "1985-01-01",
      gender: "Male",
      identificationNumber: "1234567890123",
      location: "Bangkok",
      email: "john@example.com",
      phone: "123-456-7890",
      startDate: "2020-01-01"
    }
  ];

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Employee" />

        <div>
          <form className="flex justify-end mr-5">
            <input
              type="text"
              placeholder="Search employee by ID"
              className="w-4/12 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
            />
            <button
              type="submit"
              className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-yellow-600 transition duration-300"
            >
              Create
            </button>
          </form>
        </div>

        <div className="flex flex-col p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {employees.map((employee, index) => (
              <EmployeeCard key={index} {...employee} onClick={() => handleCardClick(employee)} />
            ))}
          </div>
        </div>

        {selectedEmployee && (
          <ViewEmployee selectedEmployee={selectedEmployee} onClose={closeModal} />
        )}
      </div>
    </>
  );
}

const EmployeeCard = ({ firstName, lastName, position, email, phone, onClick }) => (
  <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
    </div>
    <p className="text-gray-700 mb-3">{position}</p>
    <div className="flex items-center mb-2">
      <MdEmail className="text-gray-500 mr-2" />
      <p className="text-gray-700">{email}</p>
    </div>
    <div className="flex items-center">
      <FaPhoneVolume className="text-gray-500 mr-2" />
      <p className="text-gray-700">{phone}</p>
    </div>
  </div>
);

export default AllEmployee;
