import React, { useState } from "react";
import Header from "../../components/header";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import AddBill from './AddBill';


function Summary() {
  const [createBill, setCreateBill] = useState (false);

  const handleClickCreate = () => {
    setCreateBill(true);
  };

  const closeModal = () => {
    setCreateBill(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Summary" />
        <h1 className='text-6xl text-black text-left font-bold ml-20 mt-10'>06 JUNE, 2024</h1>
        <div className='flex justify-start space-x-10 mt-10 ml-20'>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-80'>
            <div>
              <div className="text-3xl font-bold text-black">Sales total</div>
              <p className="text-slate-500 text-6xl font-bold mt-5">1234 ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-80'>
            <div>
              <div className="text-3xl font-bold text-black">Cost</div>
              <p className="text-slate-500 text-6xl font-bold mt-5">5678 ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl flex items-center h-40 w-80'>
            <div>
              <div className="text-3xl font-bold text-black">Profit</div>
              <p className="text-green-500 text-6xl font-bold mt-5">5678 ฿</p>
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
                  <AddBill onClose={closeModal} />
          )}
              </div>
            </div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Bill</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">QTY</Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">Amount</Typography>
                  </th>
                </tr>
              </thead>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Summary;
