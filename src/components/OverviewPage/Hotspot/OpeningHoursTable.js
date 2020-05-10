import React from "react";
import "./OpeningHours.css";

const OpeningHoursTable = (props) => {
  const enumDays = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  };

  let hasOpeningHours = true;

  if (props.openingHours.length == 0) {
    hasOpeningHours = false;
  }

  props.openingHours.sort((a, b) =>
    enumDays[a.weekDay] > enumDays[b.weekDay] ? 1 : -1
  );

  return (
    <div className="opening-container">
      <div className="opening-header text-center">
        <a>Opening hours</a>
      </div>

      {!hasOpeningHours && (
        <div className="info text-center">No opening hours available.</div>
      )}

      {hasOpeningHours && (
        <tbody className="opening-table">
          {props.openingHours.map(function (day, i) {
            return (
              <tr>
                <td className="opening-weekday">{day.weekDay.toLowerCase()}</td>
                <td className="opening-hours">
                  <small>
                    {day.openingTime} - {day.closingTime}
                  </small>
                </td>
              </tr>
            );
          })}
        </tbody>
      )}
    </div>
  );
};

export default OpeningHoursTable;
