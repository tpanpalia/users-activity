import React from "react";
import { mockdata } from "./mockApiData";
import UserButton from "./UserButton";

function UserActivity() {
  return (
    <div
      style={{
        display: "flex",
        width: "30vw",
        padding: "2vw",
        height: "30vh",
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
      }}
    >
      {mockdata.members.map((x) => {
        return <UserButton key={x.id} userActivityData={x} />;
      })}
    </div>
  );
}

export default UserActivity;
