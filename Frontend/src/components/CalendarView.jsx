import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserContext from "../context/user";
import styles from "./CalendarView.module.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const userCtx = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/tasks");
      const data = await response.json();
      const userTasks = data.filter((task) => task.username === userCtx.user);
      const formattedEvents = userTasks.map((task) => ({
        title: task.title,
        start: new Date(task.due_date),
        end: new Date(task.due_date),
        allDay: true,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className={styles["calendar-container"]}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default CalendarView;
