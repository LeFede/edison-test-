import React from "react";
import LiveSvg from "./LiveSvg";
import RecordSvg from "./RecordSvg";
import ClockSvg from "./ClockSvg";
import CalendarSvg from "./CalendarSvg";
import formatearFecha from "./formatearFecha";
import User from "./User";
import SoonSvg from "./SoonSvg";
import QuickLearnSvg from "./QuickLearnSvg";
import UltimosCuposSvg from "./UltimosCuposSvg";
import UltimoLlamadoSvg from "./UltimoLlamadoSvg";
import s from "./Card.module.css";
import timeLeft from "../../utils/timeLeft";
import { type Course } from "../../env.d";

function mixWithWhite(hexColor: string, ratio = 0.5) {
  // Asegúrate de que el color esté en formato hexadecimal
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    throw new Error("Invalid hex color format. Please use #RRGGBB.");
  }

  // Eliminar el símbolo '#' y convertir el color a RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Mezclar el color con blanco (255, 255, 255)
  const mixedR = Math.round(r + (255 - r) * ratio);
  const mixedG = Math.round(g + (255 - g) * ratio);
  const mixedB = Math.round(b + (255 - b) * ratio);

  // Convertir los valores RGB mezclados de vuelta a formato hexadecimal
  const mixedHex = `#${((1 << 24) | (mixedR << 16) | (mixedG << 8) | mixedB).toString(16).slice(1).toUpperCase()}`;

  return mixedHex;
}

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
    comingSoon,
    type,
    stock,
  } = course;
  const { startTime } = events[0];
  let { value: categoryName, htmlColor: categoryColor } = category;
  const { isAsync } = config;
  const isAsyncText = isAsync ? "Curso grabado" : "Curso en vivo";
  if (categoryColor == "#039855") categoryColor = "#037C46";

  const finalUsers = users.filter((user) => user.user.name != "Ánkyra");

  const estados = {
    PROXIMAMENTE: (
      <p className="col-span-4 self-end text-sm flex gap-1 items-center justify-center text-anuncios_500">
        <ClockSvg className="fill-anuncios_500" />
        Próximamente
      </p>
    ),
    QUICK_LEARN: (
      <div className="col-span-4 self-end text-sm flex gap-x-6 gap-y-2 items-center justify-between text-nowrap flex-wrap">
        <div className="flex gap-1 items-center">
          <CalendarSvg />
          <p>{formatearFecha(startTime)}</p>
        </div>
        <div className="flex gap-1 text-naranja_500 font-semibold items-center">
          <QuickLearnSvg />
          QUICK LEARN
        </div>
      </div>
    ),
    ULTIMOS_CUPOS: (
      <p className="col-span-4 self-end text-sm flex gap-1 items-center justify-center text-error_600">
        <div className="flex gap-1 items-center">
          <CalendarSvg />
          <p>{formatearFecha(startTime)}</p>
        </div>
        <div className="flex gap-1 ">
          <UltimosCuposSvg />
          <span className="text-error_600 text-nowrap">Últimos cupos</span>
        </div>
      </p>
    ),
    COMIENZA_PRONTO: (
      <div className="col-span-4 self-end text-sm flex gap-x-6 gap-y-2 items-center justify-between text-nowrap flex-wrap">
        <div className="flex gap-1 items-center">
          <CalendarSvg />
          <p>{formatearFecha(startTime)}</p>
        </div>

        <div className="flex gap-1 ">
          <SoonSvg />
          <span className="text-error_600 text-nowrap">Comienza pronto</span>
        </div>
      </div>
    ),
    ULTIMO_LLAMADO: (
      <div className="col-span-4 self-end text-sm flex gap-x-6 gap-y-2 items-center justify-between text-nowrap flex-wrap">
        <div className="flex gap-1">
          <CalendarSvg />
          <p>{formatearFecha(startTime)}</p>
        </div>

        <div className={`flex gap-1  ${s.ultimoLlamado} will-change-transform`}>
          <UltimoLlamadoSvg />
          <span className={`text-error_600 text-nowrap`}>Último llamado</span>
        </div>
      </div>
    ),
    NORMAL: (
      <div className="col-span-4 self-end text-sm flex gap-x-6 gap-y-2 items-center justify-between text-nowrap flex-wrap">
        <div className="flex gap-1">
          <CalendarSvg />
          <p>{formatearFecha(startTime)}</p>
        </div>
      </div>
    ),
  } as const;

  type EstadoKeys = keyof typeof estados;

  let estado: EstadoKeys | "" = isAsync
    ? type === "WORKSHOP"
      ? "QUICK_LEARN"
      : ""
    : comingSoon
      ? "PROXIMAMENTE"
      : timeLeft(startTime, "hours") < 0
        ? "ULTIMO_LLAMADO"
        : events.length == 1 || type == "WORKSHOP"
          ? "QUICK_LEARN"
          : stock <= 5
            ? "ULTIMOS_CUPOS"
            : timeLeft(startTime) < 14
              ? "COMIENZA_PRONTO"
              : "NORMAL";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener nofollow"
      title={`${timeLeft(startTime, "hours") < 0 ? "¡Todavía estás a tiempo!" : courseName}`}
      style={
        {
          // backgroundColor: `${mixWithWhite(categoryColor, 0.9)}`,
          // backgroundColor: `${categoryColor}${cardBackgroundAlpha}`,
          backgroundColor: "white",
          "--category-color": categoryColor,
        } as React.CSSProperties
      }
      aria-label={`ver curso ${courseName}`}
      className={` 
          bg-gray_25
              shadow-[0px_4px_5px_0px_rgba(0,0,0,0.1)]
              hover:shadow-cardHover
              hover:translate-y-[-.25rem] transition-transform will-change-transform transform-gpu
grid grid-cols-4 rounded-lg p-4 grid-rows-[30px_min-content_min-content_auto] min-h-64 border-gray-300 border relative ${estado == "ULTIMO_LLAMADO" ? s.card : ""}`}
    >
      <div
        className="bg-gray_25 absolute top-0 left-0 w-full h-full -z-10 rounded-lg"
        style={{ backgroundColor: mixWithWhite(categoryColor, 0.9) }}
      ></div>
      <span
        className="col-span-2 line-clamp-1 text-xs w-fit h-fit text-white px-2 py-0.5 rounded-xl"
        style={{ backgroundColor: categoryColor }}
      >
        {categoryName}
      </span>

      <span className="col-span-2 line-clamp-1 text-xs border border-black w-fit h-fit justify-self-end px-2 py-0.5 rounded-xl flex gap-1 items-center text-nowrap">
        {isAsync ? <RecordSvg /> : <LiveSvg />}
        {isAsyncText}
      </span>

      <p className="col-span-4 line-clamp-3 text-xl font-semibold leading-6 mb-6 mt-2">
        {courseName}
      </p>

      <div className="col-span-4 gap-4 flex flex-col mb-6">
        {finalUsers.map((user, index) => (
          <User key={index} user={user} solo={finalUsers.length == 1} />
        ))}
      </div>

      {estado && estados[estado]}
    </a>
  );
};

export default Card;

// <p className="col-span-4 self-end text-sm flex gap-1 items-center">
//   <CalendarSvg />
//   {formatearFecha(startTime)}
// </p>;
