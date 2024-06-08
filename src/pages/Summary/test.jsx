import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

function ViewBill({ open, handleOpen, bill }) {
  if (!bill) return null; // Return null if no bill is selected

  const TABLE_HEAD = ["Menu", "Category", "Price", "Cost", "QTY", "Total Amount"];
  
  const TABLE_ROWS = [
    { menu: "Menu 1", category: "Category 1", price: 100, cost: 50, QTY: 2 },
    { menu: "Menu 2", category: "Category 2", price: 200, cost: 100, QTY: 1 },
    { menu: "Menu 3", category: "Category 3", price: 150, cost: 75, QTY: 3 },
  ];

  const totalAmount = TABLE_ROWS.reduce((sum, row) => sum + row.price * row.QTY, 0);

  return (
    <Dialog open={open} handler={handleOpen} className="flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <DialogHeader className="flex justify-between items-center">
          <Typography className="text-4xl font-bold">View Bill</Typography>
          <Button variant="text" color="red" onClick={handleOpen}>X</Button>
        </DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Typography variant="lead" color="blue-gray" className="font-normal">
              {`Bill Number: ${bill.bill}`}
            </Typography>
            <Typography variant="lead" color="blue-gray" className="font-normal">
              {`Date: ${new Date().toLocaleDateString()}`}
            </Typography>
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none">{head}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ menu, category, price, cost, QTY }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={menu}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{menu}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{category}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{price}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{cost}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{QTY}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">{price * QTY}</Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <Typography variant="lead" color="blue-gray" className="font-normal">{`Total Amount: ${totalAmount}`}</Typography>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="red" onClick={handleOpen}>Close</Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

ViewBill.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  bill: PropTypes.object,
};

export default ViewBill;
