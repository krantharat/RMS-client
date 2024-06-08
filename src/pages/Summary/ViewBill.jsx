import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Input, Select } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { IoMdCloseCircle } from "react-icons/io";
import { menuOptions } from "./data";

function AddBill({ open, handleOpen, handleAddBill }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleMenuChange = (value) => {
    setSelectedMenu(value);
  };

  const handleAddButtonClick = () => {
    if (selectedMenu) {
      handleAddBill({ menu: selectedMenu.label, quantity });
      setSelectedMenu(null);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 border-gray-200 rounded-2xl shadow-sm w-11/12 md:w-6/12 lg:w-6/12 h-auto">
        <DialogHeader className="flex justify-between items-center">
          <Typography className="text-4xl font-bold">Add Bill</Typography>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={handleOpen}
          >
            <IoMdCloseCircle className="size-7 text-red-500 cursor-pointer hover:text-red-700 transition duration-300 mr-1.5 mt-1" />
          </button>
        </DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Select
              value={selectedMenu}
              options={menuOptions}
              onChange={handleMenuChange}
              placeholder="Select Menu"
            />
            <div className="mt-4">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>
          {selectedMenu && (
            <div className="mb-4">
              <Typography variant="lead" color="blue-gray" className="font-normal">
                Menu: {selectedMenu.label}
              </Typography>
              <Typography variant="lead" color="blue-gray" className="font-normal">
                Category: {selectedMenu.category}
              </Typography>
              <Typography variant="lead" color="blue-gray" className="font-normal">
                Price: {selectedMenu.price}
              </Typography>
              <Typography variant="lead" color="blue-gray" className="font-normal">
                Cost: {selectedMenu.cost}
              </Typography>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="filled" color="blue" onClick={handleAddButtonClick}>Add</Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

AddBill.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleAddBill: PropTypes.func.isRequired,
};

export default AddBill;
