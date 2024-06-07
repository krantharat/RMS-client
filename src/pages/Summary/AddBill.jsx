import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';

function AddBill({ open, handleOpen }) {
  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
                <Typography className="mb-1 text-4xl font-bold">
                    Add New Bill
                </Typography>
            </DialogHeader>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
            >
            <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
            />
            </svg>
        </div>
        <DialogBody>
            <Typography className="mb-10 -mt-7 items-center" color="gray" variant="lead">
            06/07/2024
            </Typography>
            <div className="mb-3 xl:w-96">
                <input
                    type="search"
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="search menu" />
            </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
            </Button>
            <Button variant="gradient" color="gray" onClick={handleOpen}>
            Send Message
            </Button>
        </DialogFooter>
    </Dialog>
  );
}

AddBill.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default AddBill;
