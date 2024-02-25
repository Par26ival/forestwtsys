// wether option select

document.addEventListener("DOMContentLoaded", function () {
  var weatherTypeInput = document.getElementById("weatherTypeInput");
  var weatherOptions = document.getElementById("weatherOptions");

  if (!weatherOptions) {
    console.error("weatherOptions not found");
    return;
  }

  function selectWeather(weather) {
    var selectedOptions = Array.from(weatherOptions.children)
      .filter(
        (option) =>
          option.dataset.weather === weather &&
          option.classList.contains("selected")
      )
      .map((option) => option.getAttribute("data-weather"));

    if (selectedOptions.length > 0) {
      weatherTypeInput.value = selectedOptions
        .filter((selected) => selected !== weather)
        .join(", ");
      weatherOptions
        .querySelector(`span[data-weather="${weather}"]`)
        .classList.remove("selected");
    } else {
      weatherTypeInput.value = [...selectedOptions, weather].join(", ");
      weatherOptions
        .querySelector(`span[data-weather="${weather}"]`)
        .classList.add("selected");
    }
  }

  var weatherOptionsSpans =
    weatherOptions.querySelectorAll("span[data-weather]");
  weatherOptionsSpans.forEach(function (span) {
    span.addEventListener("click", function () {
      var weather = span.getAttribute("data-weather");
      selectWeather(weather);
    });
  });
});

// time

function updateRealTime() {
  const timeElement = document.getElementById("realTime");
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${hours}:${formattedMinutes}`;
  timeElement.textContent = formattedTime;
}

setInterval(updateRealTime, 1000);

updateRealTime();