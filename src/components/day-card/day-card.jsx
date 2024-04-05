import React from "react";
import styles from "./day-card.module.css";

const monthNames = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

// компонент карточки в котором показывается расписание на день
const DayCard = ({ day }) => {
  // состояние карточки(открыта или нет)
  const [clicked, setClicked] = React.useState(false);

  // обработчик клика
  const handlerClick = () => {
    setClicked((clicked) => !clicked);
  };

  // находим последнее занятие
  const lastClass = day.classes[day.classes.length - 1];

  // определяем целый день занятия в дистанционом формате или нет
  const allClassDistance = day.classes.every((item) =>
    item.rooms.some((room) => room.place === "distance")
  );

  // текущая дата
  const currentDate = new Date();
  // получаем текущий год
  const currentYear = new Date().getFullYear();
  // Разбиваем строку на день и месяц
  const [dayStr, monthStr] = day.date.split(" ");
  // Получаем числовое значение месяца из словаря
  const month = monthNames[monthStr];
  // Создаем новую дату с текущим годом, месяцем и днем в миллисекундах
  const date = new Date(currentYear, month, dayStr);

  // цвет текста в зависимости от даты
  const textColor =
    currentDate.getDate() === date.getDate()
      ? "var(--text-color)"
      : currentDate.getTime() > date.getTime()
      ? "var(--color-no-active)"
      : "var(--text-color)";

  return (
    <div
      style={{
        ...(clicked
          ? { height: "200px", borderRadius: "40px" }
          : { height: "74px" }),
        ...(!clicked && currentDate.getDate() === date.getDate()
          ? { backgroundColor: "var(--current-day)" }
          : {}),
        color: textColor,
      }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <div className={styles.right}>
          <button onClick={handlerClick} className={styles.button}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              style={{ transform: clicked ? "rotate(90deg)" : "rotate(0)" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6298 3.75494L2.02082 12.364L0.606608 10.9497L9.21563 2.34072L1.29604 2.34072L1.31371 0.343146H12.6274V11.6569L10.6298 11.6745L10.6298 3.75494Z"
                fill="var(--text-color)"
              />
            </svg>
          </button>
          <span
            style={{
              ...(clicked ? { opacity: 0 } : { opacity: 1 }),
              ...(!allClassDistance && { maxWidth: "100%" }),
            }}
            className={styles.text}
          >
            {day.day}
          </span>
        </div>

        <div
          style={
            clicked
              ? { opacity: 0, maxWidth: "0px" }
              : { opacity: 1, maxWidth: "199px" }
          }
          className={styles.left}
        >
          {allClassDistance && (
            <span style={{ borderColor: textColor }} className={styles.tag}>
              дист
            </span>
          )}

          <div className={styles.time}>
            {day.classes[0].time.start}
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.7271 8.5L5.07085 7.85227L7.77255 5.15057H0.775391V4.21307H7.77255L5.07085 1.51989L5.7271 0.863636L9.54528 4.68182L5.7271 8.5Z"
                fill={textColor}
              />
            </svg>
            {lastClass ? lastClass.time.end : ""}
          </div>
        </div>
      </div>

      <div
        style={{
          ...(clicked
            ? { opacity: 1, height: "200px" }
            : { opacity: 0, height: "0px" }),
          color: textColor,
        }}
        className={styles.cardWrapper}
      >
        <div className={styles.title}>{day.day}</div>
        <div className={styles.subtitle}>{day.date}</div>
      </div>
    </div>
  );
};

export default DayCard;
