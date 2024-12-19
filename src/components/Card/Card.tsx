import React from "react";
import LiveSvg from "./LiveSvg";
import RecordSvg from "./RecordSvg";
import ClockSvg from "./ClockSvg";
import CalendarSvg from "./CalendarSvg";
import SoonSvg from "./SoonSvg";
import formatearFecha from "./formatearFecha";
import User from "./User";
import { type Course } from "../../env.d";

interface Props {
  course: Course;
}

const Card: React.FC<Props> = ({ course }) => {
  const {
    urlLanding: href,
    users,
    config,
    name: courseName,
    events,
    category,
  } = course;
  const { startTime } = events[0];
  const { value: categoryName, htmlColor: categoryColor } = category;
  const { isAsync } = config;
  const isAsyncText = isAsync ? "Curso grabado" : "Curso en vivo";
  const cardBackgroundAlpha = "10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener nofollow"
      style={
        {
          backgroundColor: `${categoryColor}${cardBackgroundAlpha}`,
          "--category-color": categoryColor,
        } as React.CSSProperties
      }
      aria-label={`ver curso ${courseName}`}
      className="grid grid-cols-4 rounded-lg p-4 grid-rows-[30px_min-content_min-content_auto] min-h-64 border-gray-300 border"
    >
      <span
        className="col-span-2 line-clamp-1 text-xs w-fit h-fit text-white px-2 py-0.5 rounded-xl"
        style={{ backgroundColor: categoryColor }}
      >
        {categoryName}
      </span>

      <span className="col-span-2 line-clamp-1 text-xs border border-black w-fit h-fit justify-self-end px-2 py-0.5 rounded-xl flex gap-1 items-center">
        {isAsync ? <RecordSvg /> : <LiveSvg />}
        {isAsyncText}
      </span>

      <p className="col-span-4 line-clamp-3 text-xl font-semibold leading-6 mb-6 mt-2">
        {courseName}
      </p>

      <div className="col-span-4 gap-4 flex flex-col mb-6">
        {users.map((user, index) => (
          <User key={index} user={user} solo={users.length == 1} />
        ))}
      </div>

      <p className="col-span-4 self-end text-sm flex gap-1 items-center">
        <CalendarSvg />
        {formatearFecha(startTime)}
      </p>
    </a>
  );
};

export default Card;
