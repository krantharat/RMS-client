import React, { useState } from "react";
import Header from "../../components/header";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import AddBill from "./AddBill"; 

function Summary() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const TABLE_HEAD = ["bill", "QTY", "amount"];

  const TABLE_ROWS = [
    {
      bill: "bill 1",
      QTY: "2",
      amount: "400",
    },
    {
      bill: "bill 2",
      QTY: "3",
      amount: "500",
    },
    {
      bill: "bill 3",
      QTY: "4",
      amount: "600",
    },
    {
      bill: "bill 4",
      QTY: "5",
      amount: "700",
    },
    {
      bill: "bill 5",
      QTY: "5",
      amount: "800",
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Summary" />
        <h1 className='text-6xl text-black text-left font-bold ml-20 mt-10'>06 JUNE, 2024</h1>
        {/* sale total boxes */}
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
              <p className="text-slate-500 text-6xl font-bold mt-5">5678 ฿</p>
            </div>
          </div>
        </div>

        {/* Table section */}
        <div className="mt-10 mx-20 flex justify-center">
          <Card className="w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography className="text-5xl font-bold">
                Orders
              </Typography>
              <div className="flex space-x-4">
                <Input type="date" className="p-2 border border-gray-300 rounded-md"/>
                <Button className="bg-amber-300 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-full w-32" onClick={handleOpen}>Add</Button>        
                <Button className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full w-32">Delete</Button>
              </div>
            </div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ bill, QTY, amount }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={bill}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {bill}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {QTY}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {amount}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <AddBill open={open} handleOpen={handleOpen} />
    </>
  );
}

export default Summary;
