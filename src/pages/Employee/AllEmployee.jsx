import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import ViewEmployee from "./ViewEmployee";
import CreateEmployee from "./CreateEmployee";
import { axiosInstance } from "../../lib/axiosInstance";

function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [createEmployee, setCreateEmployee] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get('/api/employee/allEmployee');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error getting employees:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  console.log(employees);

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClickCreate = () => {
    setCreateEmployee(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setCreateEmployee(false);
  };

  const handleDeleteEmployee = () => {
    console.log("Employee deleted:", selectedEmployee);
    setEmployees(employees.filter(employee => employee !== selectedEmployee));
    setSelectedEmployee(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeID.startsWith(searchTerm) ||
      employee.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Employee" />

        <div>
          <form className="flex justify-end mr-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search employee by ID, firstname, lastname or position"
              className="w-4/12 border border-gray-300 rounded-3xl p-2 pl-4 shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-yellow-600 transition duration-300"
              onClick={handleClickCreate}
            >
              Create
            </button>
          </form>
          {createEmployee && (
            <CreateEmployee onClose={closeModal} />
          )}
        </div>

        <div className="flex flex-col p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* {employees.map((item, index) => (
              <EmployeeCard key={index} {...item} onClick={() => handleCardClick(item)} />
            ))} */}
          </div>
        </div>

        {selectedEmployee && (
          <ViewEmployee
            selectedEmployee={selectedEmployee}
            onClose={closeModal}
            onConfirmDelete={handleDeleteEmployee}
          />
        )}
      </div>
    </>
  );
}

// const EmployeeCard = ({ firstName, lastName, position, email, phone, onClick }) => (
//   <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer" onClick={onClick}>
//     <div className="flex justify-between items-center mb-3">
//       <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
//     </div>
//     <p className="text-gray-700 mb-3">{position}</p>
//     <div className="flex items-center mb-2">
//       <MdEmail className="text-gray-500 mr-2" />
//       <p className="text-gray-700">{email}</p>
//     </div>
//     <div className="flex items-center">
//       <FaPhoneVolume className="text-gray-500 mr-2" />
//       <p className="text-gray-700">{phone}</p>
//     </div>
//   </div>
// );

export default AllEmployee;
