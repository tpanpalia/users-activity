import React, { useState } from "react";
import { ActionButton, Modal, Stack } from "office-ui-fabric-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "./UserModal.css";

function UserButton(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDetails, setCalendarDetails] = useState({
    start_time: "",
    end_time: "",
  });
  let startTime = "";
  let endTime = "";
  const getDates = () => {
    let dateArray = [];
    let startData = calendarDetails.selectedDateData.start_time
      .split(/(\s+)/)
      .filter((item) => item.trim() !== "");
    let endData = calendarDetails.selectedDateData.end_time
      .split(/(\s+)/)
      .filter((item) => item.trim() !== "");
    let calendatDate = new Date(
      startData[2],
      getMonthNumber(startData[0]),
      startData[1]
    );

    dateArray.push(calendatDate);
    startTime = timeConversion(startData[3]);
    endTime = timeConversion(endData[3]);
    return dateArray;
  };

  const timeConversion = (time) => {
    let timeArray = time.split("");
    let timeToReturn;
    if (timeArray[timeArray.length - 2] === "P") {
      let index = timeArray.findIndex((x) => {
        return x === ":";
      });
      let timeBefore = Number(timeArray.slice(0, index).join("")) + 12;
      let timeAfter = timeArray.slice(index, timeArray.length - 2).join("");
      timeToReturn = timeBefore.toString().concat(timeAfter);
      return timeToReturn;
    } else {
      return time;
    }
  };

  const displayCalendar = (selectedDateData) => {
    setIsCalendarOpen(true);
    setCalendarDetails({ ...calendarDetails, selectedDateData });
  };

  const getMonthNumber = (month) => {
    switch (month) {
      case "Jan": { return 0; }
      case "Feb": { return 1; }
      case "Mar": { return 2; }
      case "Apr": { return 3; }
      case "May": { return 4; }
      case "Jun": { return 5; }
      case "Jul": { return 6; }
      case "Aug": { return 7; } 
      case "Sep": { return 8; }
      case "Oct": { return 9; }
      case "Nov": { return 10; }
      case "Dec": { return 11; }
      default: return 0;
    }
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
        styles={{ margin: "2vw" }}
        containerClassName="activityDetailsModal"
      >
        <Stack
          style={{ margin: "2vw" }}
          horizontal={true}
          horizontalAlign="space-between"
        >
          <div style={{ width: "50%" }}>
            <ul>
              {props.userActivityData.activity_periods.map((x, index) => {
                return (
                  <li
                    style={{
                      padding: "1vw",
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                      fontWeight: "bold",
                      marginBottom: "2vh",
                    }}
                    key={index}
                  >
                    <Stack horizontal={true} horizontalAlign="space-between">
                      <div>{x.start_time}</div> TO
                      <div style={{ marginLeft: "2vw" }}>{x.end_time}</div>
                      <ActionButton
                        onClick={() => displayCalendar(x)}
                        iconProps={{ iconName: "Calendar" }}
                      />
                    </Stack>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={{ width: "40%" }}>
            {isCalendarOpen && (
              <div>
                <Calendar value={getDates()} />
                <div style={{ margin: "1vw" }}>
                  Start Time :{" "}
                  <TimePicker
                    style={{ width: "50%" }}
                    value={startTime}
                  />
                </div>
                <div style={{ margin: "1vw" }}>
                  End Time :{" "}
                  <TimePicker
                    style={{ width: "50%" }}
                    value={endTime}
                  />
                </div>
              </div>
            )}
          </div>
        </Stack>
      </Modal>
      <ActionButton
        onClick={() => setIsModalOpen(true)}
        iconProps={{ iconName: "UserFollowed" }}
      >
        {props.userActivityData.real_name}
      </ActionButton>
    </div>
  );
}

export default UserButton;
