import React from "react";
import Example from "../../components/week_view";
// Generate fake events
const generateFakeEvents = (week: Date[]) => {
  return [
    {
      id: 1,
      title: "Breakfast",
      start: new Date(week[0].setHours(6, 0, 0)),
      end: new Date(week[0].setHours(7, 0, 0)),
    },
    {
      id: 2,
      title: "Meeting with design team",
      start: new Date(week[2].setHours(10, 0, 0)),
      end: new Date(week[2].setHours(11, 0, 0)),
    },
    {
      id: 3,
      title: "Flight to Paris",
      start: new Date(week[1].setHours(8, 30, 0)),
      end: new Date(week[1].setHours(11, 0, 0)),
    },
  ];
};

function page() {
  return (
    <div>
      <Example />
    </div>
  );
}

export default page;
