import weatherStyle from '../styles/CityWeatherDetails.module.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


export default function cityWeatherDetails() {
  const [weather, setWeather] = useState({});
  const [cityName, setCityName] = useState('');
  const [units, setUnits] = useState('');
  const router = useRouter();
  useEffect(async () => {
    if (!router.isReady) return;
    const lat = router.query.lat;
    const lon = router.query.lon;
    const units = router.query.units;
    setCityName(router.query.cityName)
    setUnits(units);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,minutely,hourly&appid=446ddecef77cf67d31df1c128ef3bbdb`)
    const weather = await res.json();
    setWeather(weather)

  }, [router.isReady]);

  const convertDate = (unix_timestamp) => {
    
    var a = new Date(unix_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate(); 
  var time = date + ' ' + month + ' ' + year ;
  return time; 
  }


  return (
    <div>
      <h1>7 Days Forcast For {cityName}</h1>
      <ul>
        {console.log()}
        {(() => {
          if (weather.daily !== undefined) {
            return (
              weather.daily.map((item, key) => (
                <div key={key} className={weatherStyle.day}>
                  <span>{convertDate(item.dt)}</span>
                  <div>
                    <ul>
                      <li><strong>Condition:</strong>{item.weather[0].main}</li>
                      <li><strong>Temp:</strong>{item.temp.day+((units=='metric') ? 'C':'F')}</li>
                    </ul>
                  </div>

                </div>
              )
              )
            )
          } else {
            return (
              <div>Loading...</div>
            )
          }
        })()}

      </ul>
    </div>
  )
}



