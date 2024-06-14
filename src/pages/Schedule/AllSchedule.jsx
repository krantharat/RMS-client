import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { getMonth } from "./util";
import CalendarHeader from "../../components/CalenderHeader";
import SlideBar from "../../components/SlideBar"
import Month from "../../components/Month"


function Schedule() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  return (
    <>
      <div className="flex flex-col w-full">
        <Header title="Schedule" />
        <CalendarHeader />
        <div className="flex flex-1">
          <SlideBar />
          <Month month={currentMonth} />
        </div>      
      </div>
    </>
  );
}

export default Schedule;
