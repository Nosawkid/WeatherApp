import { useEffect, useState } from "react";
import axios from "axios";
import SearchCity from "./SearchCity";
import Feedback from "./Feedback";
import WeatherDashboard from "./WeatherDashboard";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});

  const apiKey = "befd984de4d3c050671d4eb935e6c660";

  const handleSearch = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
        setWeatherData(res.data);
      })
      .catch((err) => {
        console.log(
          "Fetching from city failed",
          err.message,
          err.response.status
        );
        setWeatherData({ error: "No City Found" });
      });
  };

  const handleSearchByCoordinates = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then((res) => setWeatherData(res.data))
      .catch((err) => console.log("Error fetching weather", err.data));
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearchByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log(error);
          console.log("Error", error.message);
        }
      );
    }
  };

  useEffect(() => {
    handleGeoLocation();
  }, []);
  return (
    <div>
      <SearchCity onSearch={handleSearch} />

      {Object.keys(weatherData).length === 0 ? (
        <Feedback message={"Try entering a location"} />
      ) : (
        <WeatherDashboard weatherData={weatherData} />
      )}
    </div>
  );
};

export default Weather;
