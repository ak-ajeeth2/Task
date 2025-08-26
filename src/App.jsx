import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  startOfDay,
  endOfDay,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Dummy JSON data
const data = {
  "01-08-2025": [{ user_1: 1 }, { user_2: 2 }, { user_3: 3 }, { user_4: 1 }],
  "03-08-2025": [{ user_1: 4 }, { user_2: 1 }],
  "05-08-2025": [{ user_1: 2 }, { user_2: 4 }, { user_3: 3 }, { user_4: 1 }],
};

// Convert dummy data into calendar events
const events = Object.keys(data).map((date) => ({
  title: `${data[date].length} users`,
  start: parse(date, "dd-MM-yyyy", new Date()),
  end: parse(date, "dd-MM-yyyy", new Date()),
  allDay: true,
  resource: date,
}));

Modal.setAppElement("#root");

export default function App() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelectSlot = ({ start }) => {
    const key = format(start, "dd-MM-yyyy");
    setSelected(key);
    if (data[key]) {
      setOpen(true);
    } else {
      alert("No data found for the selected date.");
    }
  };

  const handleSelectEvent = (event) => {
    setSelected(event.resource);
    setOpen(true);
  };

  const chartData =
    selected && data[selected]
      ? data[selected].map((obj) => {
          const key = Object.keys(obj)[0];
          return { name: key, value: obj[key] };
        })
      : [];

  return (
    <div style={{ padding: 20 }}>
      <h2>React Big Calendar with Bar Graph</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={(date) => {
          const key = format(date, "dd-MM-yyyy");
          if (selected === key) {
            return { style: { backgroundColor: "#e0f2fe" } }; // highlight selected
          }
          return {};
        }}
      />

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Bar Graph"
         style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)", // dim background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000, 
    },
    content: {
      position: "relative",
      inset: "auto",
      padding: "20px",
      borderRadius: "12px",
      background: "#fff",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "80vh",
      overflow: "auto",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
      zindex:"9999"
    },
  }}
      >
        <h3>Data for {selected}</h3>
        {chartData.length > 0 ? (
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p>No data found for the selected date.</p>
        )}
        <button onClick={() => setOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
