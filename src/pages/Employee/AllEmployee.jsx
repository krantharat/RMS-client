import React from "react"
import Header from "../../components/header"
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";

function Employee() {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Employee" />

        <div>
          <form className="flex justify-end mr-5">
            <input 
              type="text" 
              placeholder="Search employee by ID" 
              className="w-4/12 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
            <button type="submit" className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-yellow-600 transition duration-300">Create</button>
          </form>
        </div>

        <div className="flex flex-col p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <EmployeeCard name="John Doe" position="Manager" email="john@example.com" phoneNumber="123-456-7890" />
            <EmployeeCard name="Jane Smith" position="Developer" email="jane@example.com" phoneNumber="987-654-3210" />
            <EmployeeCard name="Mike Johnson" position="Designer" email="mike@example.com" phoneNumber="456-789-1234" />
            <EmployeeCard name="Emily Davis" position="Marketing" email="emily@example.com" phoneNumber="321-654-9870" />
            <EmployeeCard name="Sarah Brown" position="HR" email="sarah@example.com" phoneNumber="654-321-0987" />
          </div>
        </div>
      </div>
    </>
  )
}

const EmployeeCard = ({ name, position, email, phoneNumber }) => (
  <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">{name}</h3>
      <FaEdit className="size-5 text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300" />
    </div>
    <p className="text-gray-700 mb-3">{position}</p>
    <div className="flex items-center mb-2">
      <MdEmail className="text-gray-500 mr-2" />
      <p className="text-gray-700">{email}</p>
    </div>
    <div className="flex items-center">
      <FaPhoneVolume className="text-gray-500 mr-2" />
      <p className="text-gray-700">{phoneNumber}</p>
    </div>
  </div>
);

export default Employee
