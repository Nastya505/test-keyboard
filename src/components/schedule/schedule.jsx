import React, { useState, useEffect } from "react";
import styles from "./schedule.module.css";
import dataJson from "../../utils/data.json";
import Week from "../week/week";

// компонент расписания принимающий пропсом группу
function Schedule({ group }) {
  const [data, setData] = useState([]);
  // выбранная неделя
  const [week, setWeek] = useState(null);

  useEffect(() => {
    setData(dataJson);
  }, []);

  // находим переданую группу в данных
  const currentGroup = data.groups && data.groups.find((item) => item.group === group);

  // текущая неделя
  const currentWeek = currentGroup && currentGroup.currentWeek;
  // предыдущая неделя
  const prevWeek = currentGroup && currentGroup.prevWeek;
  // следующая неделя
  const nextWeek = currentGroup && currentGroup.nextWeek;


// обработчик клика
  const handleClick = (week) => {
    setWeek(week);
  };

//   // Определение текущей недели на основе текущей даты
// const getCurrentWeek = () => {
//   const currentDate = new Date();
//   const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
//   const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
//   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
// };

// // Внутри вашего компонента Schedule
// const currentWeekNumber = getCurrentWeek();

  useEffect(() => {
    if (currentGroup) {
      setWeek(currentWeek);
    }
  }, [data, group]);

  return (
    <div id="schedule" className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        {week === currentWeek ? (
          <>
            {prevWeek && (
              <div className={styles.buttonWrapperPrev}>
                <button onClick={() => handleClick(prevWeek)} className={styles.button}>
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
                <hr className={styles.border} />
              </div>
            )}
            <span className={styles.text}>эта неделя</span>
            {nextWeek && (
              <div className={styles.buttonWrapperNext}>
                <hr className={styles.border} />
                <button onClick={() => handleClick(nextWeek)} className={styles.button}>
                  <svg
                    style={{ transform: "rotate(180deg)" }}
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : week === nextWeek ? (
          <>
            <span className={styles.text}>Следующая неделя</span>
            <div className={styles.buttonWrapperPrev}>
              <button onClick={() => handleClick(currentWeek)} className={styles.button}>
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                    fill="#5F666B"
                  />
                </svg>
              </button>
              <hr className={styles.border} />
            </div>
          </>
        ) : (
          week === prevWeek && (
            <>
              <span className={styles.text}>Прошлая неделя</span>
              <div className={styles.buttonWrapperNext}>
                <hr className={styles.border} />
                <button onClick={() => handleClick(currentWeek)} className={styles.button}>
                  <svg
                    style={{ transform: "rotate(180deg)" }}
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.83521 6.00001L7.33521 10.5L6.36361 11.4546L0.909069 6.00001L6.36362 0.545468L7.33521 1.50001L2.83521 6.00001Z"
                      fill="#5F666B"
                    />
                  </svg>
                </button>
              </div>
            </>
          )
        )}
      </div>

      <div className={styles.sliderWeeksWrapper}>
        <div
          className={styles.sliderWeeks}
          style={{
            transform: `translateX(${
              week === prevWeek
                ? "0%"
                : week === nextWeek
                ? "-200%"
                : week === currentWeek
                ? "-100%"
                : "-100%"
            })`,
          }}
        >
          <Week week={prevWeek} />
          <Week week={currentWeek} />
          <Week week={nextWeek} />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
