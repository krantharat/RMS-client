import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@material-tailwind/react";

const ViewBill = ({ selectedBill, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBill, setEditedBill] = useState(selectedBill);
  const [bill, setBill] = useState({ ...selectedBill });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBill({
      ...editedBill,
      [name]: value,
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Bill Details</h3>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={onClose}
          >
            <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
          </button>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Menu</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.billItems && bill.billItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.menu}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.price.toFixed(2)} ฿</td>
                  <td className="border p-2">{item.cost}</td>
                  <td className="border p-2">
                    {isEditing ? (
                      <input
                        type="number"
                        name="qty"
                        value={editedBill.billItems[index].qty}
                        onChange={(e) => {
                          const updatedItems = [...editedBill.billItems];
                          updatedItems[index].qty = e.target.value;
                          setEditedBill({ ...editedBill, billItems: updatedItems });
                        }}
                        className="border border-gray-300 rounded p-1 w-full"
                      />
                    ) : (
                      item.qty
                    )}
                  </td>
                  <td className="border p-2">{item.totalAmount} ฿</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <Button className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
