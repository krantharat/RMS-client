const addBill = async (req, res) => {
  try {
      const {
          billNumber,
          date,
          totalCosteEachBill,
          totalAmount,
          menuitem
      } = req.body;

      const menuItemsWithDetails = await Promise.all(menuitem.map(async item => {
          const menuDetails = await MenuModel.findById(item.menu);
          if (!menuDetails) {
              throw new Error(`Menu item with ID ${item.menu} not found`);
          }
          return {
              menu: item.menu,
              menuCategory: menuDetails.menuCategory,
              qty: item.qty,
              price: menuDetails.price,
              cost: menuDetails.cost,
              amount: item.qty * menuDetails.price
          };
      }));

      const newBill = new SummaryModel({
          billNumber,
          date,
          totalCosteEachBill,
          totalAmount,
          menuitem: menuItemsWithDetails
      });

      await newBill.save();

      res.status(201).json({
          message: 'Bill added successfully',
          bill: newBill,
      });

  } catch (error) {
      res.status(500).send(error.message);
  }
};                                                                                                                                                                                  import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { axiosInstance } from "../../lib/axiosInstance";

let billCounter = 1;

const CreateBill = ({ onClose, onSave }) => {
const [selectedMenu, setSelectedMenu] = useState(null);
const [qty, setQty] = useState(1);
const [billItems, setBillItems] = useState([]);
const [billNumber, setBillNumber] = useState(billCounter);
const [currentDate, setCurrentDate] = useState('');
const [menus, setMenus] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

const fetchMenu = async () => {
  try {
    const response = await axiosInstance.get('/api/menu/allMenu');
    setMenus(response.data);
  } catch (error) {
    console.error('Error getting menus:', error);
  }
};

useEffect(() => {
  setCurrentDate(new Date().toLocaleDateString());
  fetchMenu();
}, []);

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const handleMenuChange = (e) => {
  const menuItemId = (e.target.value);
  const menuItem = menus.find((item) => item._id === menuItemId);
  setSelectedMenu(menuItem);
};

const handleQtyChange = (e) => {
  setQty(parseInt(e.target.value));
};

const handleAddItem = () => {
  if (selectedMenu && qty > 0) {
    setBillItems([...billItems, { ...selectedMenu, qty }]);
    setSelectedMenu(null);
    setQty(1);
    setSearchTerm('');
  } else {
    console.error('Invalid selected menu or quantity');
  }
};

const calculateTotalAmount = () => {
  return billItems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
};

const calculateTotalCost = () => {
  return billItems.reduce((total, item) => total + (item.cost * item.qty), 0).toFixed(2);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.post('/api/summary/addBill', {
      billNumber,
      date: currentDate,
      totalCost: calculateTotalCost(),
      totalAmount: calculateTotalAmount(),
      menuitem: billItems.map(item => ({
        menu: item.id,
        qty: item.qty
      }))
    });

    onSave({
      billNumber,
      date: currentDate,
      totalCost: calculateTotalCost(),
      totalAmount: calculateTotalAmount(),
    });

    billCounter += 1;
    onClose();
  } catch (error) {
    console.error('Error creating bill:', error);
  }
};

const filteredMenus = menus.filter(menu => 
  menu.menuName.toLowerCase().includes(searchTerm.toLowerCase())
);

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
              <label className="block text-sm font-medium text-gray-700">Select Menu</label>
              <select
                name="menu"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ring-neutral-300"
                onChange={handleMenuChange}
                value={selectedMenu ? selectedMenu._id : ''}
              >
                <option key="default" value="">Select a menu item</option>
                {filteredMenus.map((menu) => (
                  <option key={menu._id} value={menu._id}>
                    {menu.menuName}
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
                  min="1"
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
                    <td className="border p-2">{item.menuName}</td>
                    <td className="border p-2">{item.menuCategory}</td>
                    <td className="border p-2">{item.price.toFixed(2)} ฿</td>
                    <td className="border p-2">{(item.cost * item.qty).toFixed(2)} ฿</td>
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