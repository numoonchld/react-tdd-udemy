import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

function Homes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const homesDataPromise = apiClient.getHomes();

      const homesData = await homesDataPromise;
      console.log(homesData);
      setHomes(homesData);

      // homesDataPromise.then((data) => {
      //   // console.log(data);
      //   setHomes(data);
      // });
    };

    apiCall();
  }, []);

  return (
    <div>
      {homes.map((home) => {
        console.log(home);
        return (
          <div key={home.title} data-testid="home">
            <div data-testid="home-title">{home.title}</div>
            <img data-testid="home-image" src={home.image} alt={home.title} />
            <div data-testid="home-location">{home.location}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Homes;
