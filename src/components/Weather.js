import Day from "./Day";

function Weather({ weather, location, isLoading }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      {isLoading ? <h2>Loading...</h2> : <h2>Weather for {location}</h2>}
      <ul className="weather">
        {dates.map((date, i) => (
          <Day date={date} max={max[i]} min={min[i]} code={codes[i]} key={date} isToday={i === 0} />
        ))}
      </ul>
    </div>
  );
}

export default Weather;
