import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { menuData } from './data';

let billCounter = 1;

const CreateBill = ({ onClose, onSave }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [qty, setQty] = useState(1);
  const [billItems, setBillItems] = useState([]);
  const [billNumber, setBillNumber] = useState(billCounter);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleMenuChange = (e) => {
    const menuItem = menuData.find(item => item.id === parseInt(e.target.value));
    setSelectedMenu(menuItem);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleAddItem = () => {
    if (selectedMenu && qty > 0) {
      setBillItems([...billItems, { ...selectedMenu, qty: parseInt(qty) }]);
      setSelectedMenu(null);
      setQty(1);
    }
  };

  const calculateTotalAmount = () => {
    return billItems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
  };

  const calculateTotalCost = () => {
    return billItems.reduce((total, item) => total + (item.cost), 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = calculateTotalCost();
    const totalAmount = calculateTotalAmount();

    onSave({
      billNumber,
      currentDate,
      totalCost,
      totalAmount,
    });

    billCounter += 1;
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold">Add New Bill</h3>
        </div>
        <div className="p-5 bg-white h-96 overflow-y-auto border border-gray-300 mt-3">
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bill Number</label>
                <input
                  type="text"
                  name="billNumber"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={billNumber}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  name="currentDate"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={currentDate}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search Menu</label>
                <select
                  name="menu"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  onChange={handleMenuChange}
                  value={selectedMenu ? selectedMenu.id : ''}
                >
                  <option value="">Select a menu item</option>
                  {menuData.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.menu}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                  value={qty}
                  onChange={handleQtyChange}
                />
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="bg-amber-300 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-full w-20"
                onClick={handleAddItem}
              >Add
              </button>
            </div>

            <div className="mt-4">
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
                  {billItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">{item.menu}</td>
                      <td className="border p-2">{item.category}</td>
                      <td className="border p-2">{item.price.toFixed(2)} ฿</td>
                      <td className="border p-2">{item.cost}</td>
                      <td className="border p-2">{item.qty}</td>
                      <td className="border p-2">{(item.price * item.qty).toFixed(2)} ฿</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total Cost: {calculateTotalCost()} ฿</h3>
              <h3 className="text-xl font-bold">Total Amount: {calculateTotalAmount()} ฿</h3>
            </div>

            <div className="flex flex-col">
              <div className='flex justify-center mt-2'>
                <button
                  type="submit"
                  className="w-20 bg-green-500 text-white font-medium capitalize border-0 rounded-3xl ml-5 p-2 hover:bg-green-700 transition duration-300"
                >Save
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

export default CreateBill;
