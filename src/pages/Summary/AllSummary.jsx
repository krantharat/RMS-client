import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import CreateBill from './AddBill';
import ViewBill from './ViewBill';
import { axiosInstance } from "../../lib/axiosInstance";

function Summary() {
  const [createBill, setCreateBill] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const response = await axiosInstance.get('/api/summary/getAllBill');
      setBills(response.data);
    } catch (error) {
      console.error('Error getting bill:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(bills);

  useEffect(() => {
    setLoading(true);
    fetchBills();
  }, []);

  const handleClickCreate = () => {
    setCreateBill(true);
  };

  const closeModal = () => {
    setCreateBill(false);
  };

  const handleSaveBill = (newBill) => {
    setBills([...bills, newBill]);
  };

  const handleBillClick = (bill) => {
    setSelectedBill(bill);
  };

  const handleModalClose = () => {
    setSelectedBill(null);
  };

  const calculateSaleTotal = () => {
    return bills.reduce((total, bill) => total + parseFloat(bill.totalAmount), 0).toFixed(2);
  };

  const calculateTotalCost = () => {
    return bills.reduce((total, bill) => total + parseFloat(bill.totalCosteEachBill), 0).toFixed(2);
  };

  const calculateProfit = () => {
    const totalAmount = parseFloat(calculateSaleTotal());
    const totalCost = parseFloat(calculateTotalCost());
    return (totalAmount - totalCost).toFixed(2);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (bills.length === 0) {
    return <p>No bills available</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Summary" />
        <h1 className='text-6xl text-black text-left font-bold ml-20 mt-10'>06 JUNE, 2024</h1>
        <div className='flex justify-start space-x-10 mt-10 ml-20'>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-90'>
            <div>
              <div className="text-3xl font-bold text-black">Sales total</div>
              <p className="text-slate-500 text-6xl font-bold mt-5">{calculateSaleTotal()} ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-90'>
            <div>
              <div className="text-3xl font-bold text-black">Cost</div>
              <p className="text-slate-500 text-6xl font-bold mt-5">{calculateTotalCost()} ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-90'>
            <div>
              <div className="text-3xl font-bold text-black">Profit</div>
              <p className="text-green-500 text-6xl font-bold mt-5">{calculateProfit()} ฿</p>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-20 flex justify-center">
          <Card className="w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography className="text-5xl font-bold">Orders</Typography>
              <div className="flex space-x-4">
                <Input type="date" className="p-2 border border-gray-300 rounded-md"/>
                <Button className="bg-amber-300 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-full w-32" onClick={handleClickCreate}>Add</Button>        
                <Button className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full w-32">Delete</Button>
                {createBill && (
                  <CreateBill onClose={closeModal} onSave={handleSaveBill} />
                )}
              </div>
            </div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Date</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Bill Number</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Total Cost</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Total Amount</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} onClick={() => handleBillClick(bill)} className="cursor-pointer hover:bg-gray-200">
                    <td className="border p-4">{new Date(bill.date).toLocaleDateString()}</td>
                    <td className="border p-4">{bill.billNumber}</td>
                    <td className="border p-4">{bill.totalCosteEachBill} ฿</td>
                    <td className="border p-4">{bill.totalAmount} ฿</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        {selectedBill && (
          <ViewBill selectedBill={selectedBill} onClose={handleModalClose} />
        )}
      </div>
    </>
  );
}

export default Summary;
