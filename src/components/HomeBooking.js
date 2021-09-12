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
      <h2 data-testid="title">{props.home.title}</h2>
      <div data-testid="price" className="mb-3">
        <span className="font-weight-bold text-primary text-large">
          USD {props.home.price}
        </span>{" "}
        per night
      </div>
      <div className="form-group">
        <label htmlFor="checkInDate">Check-In Date</label>
        <br />
        <input
          id="checkInDate"
          data-testid="check-in"
          className="form-control"
          onChange={(e) => setCheckInDate(e.target.value)}
          type="date"
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="checkOutDate">Check-Out Date</label>
        <br />
        <input
          id="checkOutDate"
          data-testid="check-out"
          className="form-control"
          onChange={(e) => setCheckOutDate(e.target.value)}
          type="date"
        />
      </div>
      <div data-testid="total" className="my-3 text-right">
        <span className="font-weight-bold text-large">
          Total: USD {totalPrice}
        </span>
      </div>
      <div className="d-flex justify-content-end">
        <button
          data-testid="book-btn"
          onClick={handleBooking}
          className="btn btn-primary"
        >
          Book
        </button>
      </div>
    </>
  );
}

export default HomeBooking;
