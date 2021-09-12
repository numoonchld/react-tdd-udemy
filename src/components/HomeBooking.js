import React, { useState, useEffect } from "react";
import moment from "moment";
import apiClient from "../services/apiClient";
import bookingDialogService from "../services/bookingDialogService";
import notificationService from "../services/notificationService";

function HomeBooking(props) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const price = props.home ? props.home.price : 0;
    const checkInDataFormatted = moment(checkInDate, "YYYY-MM-DD");
    const checkOutDataFormatted = moment(checkOutDate, "YYYY-MM-DD");
    const nights = checkOutDataFormatted.diff(checkInDataFormatted, "days");

    const totalCalc = nights * price;
    if (Number.isInteger(totalCalc)) {
      setTotalPrice(totalCalc);
    } else {
      setTotalPrice("--");
    }
    return () => {};
  }, [checkInDate, checkOutDate, props]);

  const handleBooking = () => {
    apiClient
      .bookHome(props.home, checkInDate, checkOutDate)
      .then((message = "Mocked home booked!") => {
        bookingDialogService.close();
        notificationService.open(message);
      });
  };

  if (!props.home) {
    return <div data-testid="empty"></div>;
  }
  return (
    <>
      <div data-testid="title">{props.home.title}</div>
      <div data-testid="price">{props.home.price}</div>
      <input
        data-testid="check-in"
        onChange={(e) => setCheckInDate(e.target.value)}
        type="date"
      />
      <input
        data-testid="check-out"
        onChange={(e) => setCheckOutDate(e.target.value)}
        type="date"
      />
      <div data-testid="total">{totalPrice}</div>

      <button
        data-testid="book-btn"
        onClick={handleBooking}
        className="btn btn-primary"
      >
        Book
      </button>
    </>
  );
}

export default HomeBooking;
