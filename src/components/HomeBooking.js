import React from "react";

function HomeBooking(props) {
  return <>{props.home ? props.home.title : null}</>;
}

export default HomeBooking;
