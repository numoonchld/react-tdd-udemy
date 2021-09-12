import { Dialog, DialogContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import bookingDialogService from "../services/bookingDialogService";
import HomeBooking from "./HomeBooking";

function Homes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    // const homesDataPromise = apiClient.getHomes();
    // homesDataPromise.then((data) => {
    //   // console.log(data);
    //   setHomes(data);
    // });

    const apiCall = async () => {
      const homesDataPromise = apiClient.getHomes();

      const homesData = await homesDataPromise;
      setHomes(homesData);
    };

    apiCall();
  }, []);

  const [bookingDialogState, setBookingDialogState] = useState({
    open: false,
    home: null,
  });

  useEffect(() => {
    const subscription = bookingDialogService.events$.subscribe((state) =>
      setBookingDialogState(state)
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="container m-2">
        <h1>Homes</h1>
        <div className="row">
          {homes.map((home) => {
            return (
              <div
                className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3"
                key={home.title}
              >
                <div data-testid="home" className="card w-100">
                  <img
                    data-testid="home-image"
                    src={home.image}
                    alt={home.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div data-testid="home-title" className="card-title h5">
                      {home.title}
                    </div>
                    <div data-testid="home-location">{home.location}</div>
                    <div data-testid="home-price">${home.price}/night</div>
                    <div className="d-flex justify-content-end">
                      <button
                        data-testid="home-booking-button"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => bookingDialogService.open(home)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Dialog
          open={bookingDialogState.open}
          onClose={() => bookingDialogService.close()}
          maxWidth="xs"
          fullWidth={true}
        >
          <DialogContent>
            <HomeBooking home={bookingDialogState.home} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Homes;
