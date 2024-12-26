import React from "react";
import { type User } from "../../env.d";

interface Props {
  user: User;
  solo: boolean;
}

const UserCard: React.FC<Props> = ({ user, solo }) => {
  const { userId, user: realUser } = user;
  const { name, company, jobTitle } = realUser;

  const srcset = [
    `/__optimized-images/${userId}_1x.webp 1x`,
    `/__optimized-images/${userId}_2x.webp 2x`,
    `/__optimized-images/${userId}_3x.webp 3x`,
  ].join(", ");

  return (
    <div className="col-span-4 grid grid-cols-[40px_auto] gap-x-4 grid-rows-[auto_auto] place-self-start gap-y-1">
      <div
        className="row-span-2
        flex items-start justify-center pt-0.5
relative after:content-[''] after:absolute after:top-0 after:left-0 after:border after:border-[var(--category-color)] after:w-full after:aspect-square after:rounded-full
        "
      >
        <img
          src={`/__optimized-images/${userId}_1x.webp`}
          alt="profile"
          width={36}
          height={36}
          srcSet={srcset}
          loading="lazy"
          className="rounded-full"
        />
      </div>

      <p
        className={`leading-6 font-semibold ${solo ? "line-clamp-2" : "line-clamp-1"}`}
      >
        {name}
      </p>
      <p
        className={`text-sm leading-5 ${solo ? "line-clamp-2" : "line-clamp-1"}`}
      >
        {jobTitle} {company}
      </p>
    </div>
  );
};

export default UserCard;
