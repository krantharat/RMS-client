import React from "react";
import CreateEventButton from "./CreateEventButton.jsx";
import SmallCalendar from "./SmallCalender.jsx";
import Labels from "./Labels.jsx";

export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
