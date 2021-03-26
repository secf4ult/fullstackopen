import React from "react";

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div className={message.type === "success" ? "success" : "error"}>
      {message.info}
    </div>
  );
};

export default Notification;
