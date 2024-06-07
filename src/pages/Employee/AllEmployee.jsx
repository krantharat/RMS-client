import React, { useState } from "react";
import Header from "../../components/header";
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import ViewEmployee from "./ViewEmployee";
import EditEmployee from "./EditEmployee";

function AllEmployee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    },
    {
      employeeID: "E002",
      firstName: "Jane",
      lastName: "Smith",
      nickName: "Janey",
      position: "Developer",
      dateOfBirth: "1990-02-02",
      gender: "Female",
      identificationNumber: "2345678901234",
      location: "Bangkok",
      email: "jane@example.com",
      phone: "987-654-3210",
      startDate: "2021-02-01"
    },
    {
      employeeID: "E003",
      firstName: "Mike",
      lastName: "Johnson",
      nickName: "Mikey",
      position: "Designer",
      dateOfBirth: "1988-03-03",
      gender: "Male",
      identificationNumber: "3456789012345",
      location: "Bangkok",
      email: "mike@example.com",
      phone: "456-789-1234",
      startDate: "2019-03-01"
    },
    {
      employeeID: "E004",
      firstName: "Emily",
      lastName: "Davis",
      nickName: "Em",
      position: "Marketing",
      dateOfBirth: "1992-04-04",
      gender: "Female",
      identificationNumber: "4567890123456",
      location: "Bangkok",
      email: "emily@example.com",
      phone: "321-654-9870",
      startDate: "2018-04-01"
    },
    {
      employeeID: "E005",
      firstName: "Sarah",
      lastName: "Brown",
      nickName: "Sally",
      position: "HR",
      dateOfBirth: "1989-05-05",
      gender: "Female",
      identificationNumber: "5678901234567",
      location: "Bangkok",
      email: "sarah@example.com",
      phone: "654-321-0987",
      startDate: "2022-05-01"
    }
  ];

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(false);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsEditing(false);
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
              <EmployeeCard key={index} {...employee} onClick={() => handleCardClick(employee)} onEdit={() => handleEditClick(employee)} />
            ))}
          </div>
        </div>

        {selectedEmployee && !isEditing && (
          <ViewEmployee selectedEmployee={selectedEmployee} onClose={closeModal} />
        )}
        {selectedEmployee && isEditing && (
          <EditEmployee selectedEmployee={selectedEmployee} onClose={closeModal} />
        )}
      </div>
    </>
  );
}

const EmployeeCard = ({ firstName, lastName, position, email, phone, onClick, onEdit }) => (
  <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
      <FaEdit className="size-5 text-blue-500 cursor-pointer hover:text-gray-700 transition duration-300" onClick={onEdit} />
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
