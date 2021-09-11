import React, { useEffect, useState } from "react";

function Homes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const homesDataPromise = Promise.resolve([
      {
        title: "Test Home 1",
        image: "listing.jpg",
        location: "Test Location 1",
        price: 1,
      },
      {
        title: "Test Home 2",
        image: "listing.jpg",
        location: "Test Location 2",
        price: 2,
      },
      {
        title: "Test Home 3",
        image: "listing.jpg",
        location: "Test Location 3",
        price: 3,
      },
      {
        title: "Test Home 4",
        image: "listing.jpg",
        location: "Test Location 4",
        price: 4,
      },
    ]);

    homesDataPromise.then((data) => {
      // console.log(data);
      setHomes(data);
    });
  }, []);

  return (
    <div>
      {homes.map((home) => (
        <div key={home.title} data-testid="home">
          {home.title}
        </div>
      ))}
    </div>
  );
}

export default Homes;
