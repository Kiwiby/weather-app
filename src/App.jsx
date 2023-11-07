import React, { useState } from "react";

import "./scss/App.scss";
import cludy from "../src/assets/image/cludy.png";
import wind from "../src/assets/image/wind.png";
import humidity from "../src/assets/image/humidity.png";
import searchIcon from "../src/assets/image/search.svg";
import arrow from "../src/assets/image/arrow-down.svg";

const api = {
  key: "096cac6ca15e048adc50af371130124d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = React.useState("");
  const [weather, setWeather] = React.useState({});
  const [showMore, setShowMore] = React.useState(false);

  const btnClick = () => {
    fetch(
      `${api.base}weather?q=${search}&exclude=hourly,daily&units=metric&APPID=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  };

  const btnShowMore = () => {
    setShowMore(!showMore);
    console.log("123");
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="weather-block">
          <div className="search">
            <input
              type="text"
              placeholder="Enter you're city"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src={searchIcon}
              alt="search"
              onClick={btnClick}
              width={42}
              height={42}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div className="content">
              <div className="col-left">
                <img src={cludy} alt="cludy" width={300} height={300} />
              </div>
              <div className="col-right">
                <p className="temp">{weather.main.temp}°C</p>
                <p className="weather">{weather.weather[0].main}</p>
                <p className="location">
                  {weather.name}, {weather.sys.country}
                </p>
                <div className="weather-row">
                  <div className="col-humidity">
                    <div className="col">
                      <img src={humidity} alt="humidity" />
                    </div>
                    <div className="col">
                      <p>{weather.main.humidity}%</p>
                      <span>Humidity</span>
                    </div>
                  </div>
                  <div className="col-wind">
                    <div className="col">
                      <img src={wind} alt="wind" />
                    </div>
                    <div className="col">
                      <p>{weather.wind.speed}km/h</p>
                      <span>Wind Speed</span>
                    </div>
                  </div>
                </div>
                <button onClick={btnShowMore}>
                  Show more
                  <img src={arrow} alt="down" width={16} height={16} />
                </button>
                {showMore && <div className="info">NEGRI PEDORASY</div>}
              </div>
            </div>
          ) : (
            <div className="content">
              <div className="col-left">
                <img src={cludy} alt="cludy" width={300} height={300} />
              </div>
              <div className="col-right">
                <p className="temp">23°C</p>
                <p className="weather">Clear</p>
                <p className="location">New York, US</p>
                <div className="weather-row">
                  <div className="col-humidity">
                    <div className="col">
                      <img src={humidity} alt="humidity" />
                    </div>
                    <div className="col">
                      <p>68%</p>
                      <span>Humidity</span>
                    </div>
                  </div>
                  <div className="col-wind">
                    <div className="col">
                      <img src={wind} alt="wind" />
                    </div>
                    <div className="col">
                      <p>2km/h</p>
                      <span>Wind Speed</span>
                    </div>
                  </div>
                </div>
                <button>
                  Show more
                  <img src={arrow} alt="down" width={16} height={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
