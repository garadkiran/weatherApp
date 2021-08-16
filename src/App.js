import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const App = () => {
  const [apiData, setApiData] = useState({});
  const [apiDataLocalData, setApiDataLocalData] = useState([]);
  const [getState, setGetState] = useState("pune");
  const [dataListOption, setDataListOption] = useState([]);

  // API KEY AND URL
  const apiKey = "094aa776d64c50d5b9e9043edd4ffd00";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getState}&appid=${apiKey}`;

  // Side effect

  const fetchApiData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setApiDataLocalData([...apiDataLocalData, data]);
      });
  };

  useEffect(() => {
    fetchApiData();
    setDataListOption([getState]);
  }, []);

  const submitHandler = () => {
    setDataListOption(dataListOption.concat(getState));
    const checkDataPresent = apiDataLocalData.filter((eachItem) => {
      let lowerCaseNameState = getState.toLowerCase();
      let lowerCaseNameAPI = eachItem.name.toLowerCase();
      return lowerCaseNameState == lowerCaseNameAPI;
    });
    if (checkDataPresent == false) {
      fetchApiData();
    } else {
      console.log(checkDataPresent);
      setApiData(checkDataPresent[0]);
    }
  };

  const datalistOption = () => {
    const uniquedataListOption = [...new Set(dataListOption)];
    const data = uniquedataListOption.map((item) => {
      return <option value={item} key={item} />;
    });
    return data;
  };

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };
  return (
    <div className="App">
      <header className="">
        <h2>Weather</h2>
      </header>
      <div className="container">
        <div className="container-search">
          <div className="">
            <label htmlFor="" className="">
              Enter Location :
            </label>
          </div>
          <div className="container-result">
            <input
              type="text"
              onChange={inputHandler}
              value={getState}
              list="browsers"
            />

            <datalist id="browsers">{datalistOption()}</datalist>
          </div>
          <button className="" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="">
          {apiData.main ? (
            <div className="">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt=""
                className=""
              />

              <p className="">{kelvinToFarenheit(apiData.main.temp)}&deg; C</p>

              <p className="h5">
                <i className=""></i>
                <strong>{apiData.name}</strong>
              </p>

              <div className="">
                <div className="">
                  <p>
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                </div>
                <div className="">
                  <p>
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
