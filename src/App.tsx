import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Card, CardBody, IconButton } from "@material-tailwind/react";
import TimePicker, { TimePickerValue } from "react-time-picker";

type MultipleTime = {
  start: TimePickerValue;
  end: TimePickerValue;
};

type PersonTime = {
  freeTime: MultipleTime[];
  busyTime: MultipleTime[];
};
const baseBusyTime = { start: "10:00", end: "15:00" };
const baseFreeTime = { start: "20:00", end: "21:00" };
function App() {
  const [personTime, setPersonTime] = useState<PersonTime>({
    freeTime: [{ start: "17:00", end: "19:00" }],
    busyTime: [],
  });

  const onChangeFreeTime = (
    time: TimePickerValue,
    target: "start" | "end",
    index: number
  ) => {
    const updatedTime = { ...personTime.freeTime[index], [target]: time };
    const cloneFreeTime = [...personTime.freeTime];
    cloneFreeTime.splice(index, 1, updatedTime)
    setPersonTime({
      ...personTime,
      freeTime: [...cloneFreeTime],
    });
  };

  const addFreeTime = () => {
    setPersonTime({
      ...personTime,
      freeTime: [...personTime.freeTime, baseFreeTime],
    });
  };
  const reduceFreeTime = (index: number) => {
    setPersonTime({
      ...personTime,
      freeTime: [...personTime.freeTime.slice(index, index + 1)],
    });
  };

  const onChangeBusyTime = (
    time: TimePickerValue,
    target: "start" | "end",
    index: number
  ) => {
    const updatedTime = { ...personTime.busyTime[index], [target]: time };
    const cloneBusyTime = [...personTime.busyTime];
    cloneBusyTime.splice(index, 1, updatedTime)
    setPersonTime({
      ...personTime,
      busyTime: [...cloneBusyTime],
    });
    // setPersonTime({
    //   ...personTime,
    //   busyTime: [{ ...personTime.busyTime[index], [target]: time }],
    // });
  };

  const addBusyTime = () => {
    setPersonTime({
      ...personTime,
      busyTime: [...personTime.busyTime, baseBusyTime],
    });
  };
  const clearBusyTime = () => {
    setPersonTime({
      ...personTime,
      busyTime: [],
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <CardBody>
            Free Time
            {personTime.freeTime.length < 2 && (
              <Button onClick={addFreeTime}>Add Free Time</Button>
            )}
            {personTime.freeTime.map((freeTime, index) => {
              return (
                <div className="flex mb-2 space-x-2">
                  Start
                  <TimePicker
                    onChange={(time: TimePickerValue) =>
                      onChangeFreeTime(time, "start", index)
                    }
                    value={freeTime.start}
                    disableClock
                  />
                  End
                  <TimePicker
                    onChange={(time: TimePickerValue) =>
                      onChangeFreeTime(time, "end", index)
                    }
                    value={freeTime.end}
                    disableClock
                  />
                  {index > 0 && (
                    <IconButton
                      className="m-0"
                      onClick={() => reduceFreeTime(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        stroke="black"
                        stroke-width="2"
                        className="react-time-picker__clear-button__icon react-time-picker__button__icon"
                      >
                        <line x1="4" x2="15" y1="4" y2="15"></line>
                        <line x1="15" x2="4" y1="4" y2="15"></line>
                      </svg>
                    </IconButton>
                  )}
                </div>
              );
            })}
            <div className="flex justify-center space-x-2">
              Busy Time
              {personTime.busyTime.length < 1 ? (
                <Button onClick={addBusyTime}>Add Busy Time</Button>
              ) : (
                <Button onClick={clearBusyTime}>Remove Busy Time</Button>
              )}
            </div>
            {personTime.busyTime.map((busyTime, index) => {
              return (
                <div className="flex space-x-2">
                  Start
                  <TimePicker
                    onChange={(time: TimePickerValue) =>
                      onChangeBusyTime(time, "start", index)
                    }
                    value={busyTime.start}
                    disableClock
                  />
                  End
                  <TimePicker
                    onChange={(time: TimePickerValue) =>
                      onChangeBusyTime(time, "end", index)
                    }
                    value={busyTime.end}
                    disableClock
                  />
                </div>
              );
            })}
          </CardBody>
        </Card>
        
      </header>
    </div>
  );
}

export default App;
