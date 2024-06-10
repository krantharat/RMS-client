import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Card } from "@material-tailwind/react";
import { axiosInstance } from "../../lib/axiosInstance";
import CreateShift from "./CreateShift";

function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [createShift, setCreateShift] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const response = await axiosInstance.get('/api/schedule/getAllShift');
      setShifts(response.data);
    } catch (error) {
      console.error('Error getting shifts:', error);
    }
  };

  const handleCellClick = (shift, date) => {
    setSelectedDate(date);
    setSelectedShift(shift);
  };

  const handleClickCreate = () => {
    setCreateShift(true);
  };

  const closeModal = () => {
    setCreateShift(false);
    setShowModal(false);
  };

  const mergeColumns = (startHour, endHour) => {
    const startShift = selectedShift && parseInt(selectedShift.startTime.split(':')[0]);
    const endShift = selectedShift && parseInt(selectedShift.endTime.split(':')[0]);
    return startShift === startHour && endShift === endHour;
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Schedule" />
        <div className="flex justify-between items-center mb-5">
          <input
            className="p-2 border border-gray-300 rounded-md w-64"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            type="button"
            className="w-20 bg-yellow-500 text-white font-medium capitalize border-0 rounded-3xl p-2 hover:bg-yellow-600 transition duration-300"
            onClick={handleClickCreate}
          >
            Create
          </button>
          {createShift && (
            <CreateShift onClose={closeModal} />
          )}
        </div>
        
        <Card className="w-full p-6">
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                {[...Array(10).keys()].map((hour) => (
                  <th key={hour} className="border border-gray-400 h-10">{`${hour + 8}.00`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  {[...Array(10).keys()].map((cell) => (
                    <td
                      key={cell}
                      className="border border-gray-400 cursor-pointer h-10"
                      onClick={() => handleCellClick(shift, `${selectedDate} ${8 + cell}:00`)}
                    >
                      {cell === 0 ? (
                        <div className="flex flex-col items-start">
                          <span className="font-semibold">{shift.firstName}</span>
                          <span className="text-sm">{shift.position}</span>
                          <span className="text-sm">{selectedDate}</span>
                        </div>
                      ) : (
                        mergeColumns(8 + cell, 8 + cell + 1) && (
                          <div className="flex flex-col items-start">
                            <span className="font-semibold">{shift.startTime} - {shift.endTime}</span>
                          </div>
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

export default Schedule;
