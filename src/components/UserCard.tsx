import React from "react";
import type { User } from "../api/users";

type Props = {
  user: User | null;
  index: number;
  updated: boolean;
};

export const UserCard: React.FC<Props> = ({ user, index, updated }) => (
  <div className={`item slot${index + 1}`}>
    <div className={`card ${updated ? "updated" : ""}`}>
      <div className="index">{index + 1}</div>
      {user ? (
        <>
          <img
            className="avatar"
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            loading="lazy"
          />
          <div className="name">
            {user.name.first} {user.name.last}
          </div>
        </>
      ) : (
        <div className="placeholder">—</div>
      )}
    </div>
  </div>
);
