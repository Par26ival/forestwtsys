// type

document.addEventListener("DOMContentLoaded", function () {
  var typeTypeInput = document.getElementById("emerTypeInput");
  var typeOptions = document.getElementById("typeOptions");

  if (!typeOptions) {
    console.error("typeOptions not found");
    return;
  }

  function selecttype(type) {
    var selectedOptions = Array.from(typeOptions.children)
      .filter(
        (option) =>
          option.dataset.type === type && option.classList.contains("selected")
      )
      .map((option) => option.getAttribute("type"));

    if (selectedOptions.length > 0) {
      typeTypeInput.value = selectedOptions
        .filter((selected) => selected !== type)
        .join(", ");
      typeOptions
        .querySelector(`span[type="${type}"]`)
        .classList.remove("selected");
    } else {
      typeTypeInput.value = [...selectedOptions, type].join(", ");
      typeOptions
        .querySelector(`span[type="${type}"]`)
        .classList.add("selected");
    }
  }

  var typeOptionsSpans = typeOptions.querySelectorAll("span[type]");
  typeOptionsSpans.forEach(function (span) {
    span.addEventListener("click", function () {
      var type = span.getAttribute("type");
      selecttype(type);
    });
  });
});

// location

document.addEventListener("DOMContentLoaded", function () {
  var locTypeInput = document.getElementById("locTypeInput");
  var locOptions = document.getElementById("locOptions");

  if (!locOptions) {
    console.error("locOptions not found");
    return;
  }

  function selectloc(loc) {
    var selectedOptions = Array.from(locOptions.children)
      .filter(
        (option) =>
          option.dataset.loc === loc && option.classList.contains("selected")
      )
      .map((option) => option.getAttribute("loc"));

    if (selectedOptions.length > 0) {
      locTypeInput.value = selectedOptions
        .filter((selected) => selected !== loc)
        .join(", ");
      locOptions
        .querySelector(`span[loc="${loc}"]`)
        .classList.remove("selected");
    } else {
      locTypeInput.value = [...selectedOptions, loc].join(", ");
      locOptions.querySelector(`span[loc="${loc}"]`).classList.add("selected");
    }
  }

  var locOptionsSpans = locOptions.querySelectorAll("span[loc]");
  locOptionsSpans.forEach(function (span) {
    span.addEventListener("click", function () {
      var loc = span.getAttribute("loc");
      selectloc(loc);
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

// date
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function updateDateAndYear() {
  const dateElement = document.getElementById("date");
  const yearElement = document.getElementById("year");
  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`; // Adjust the date format here
  dateElement.textContent = formattedDate;
  yearElement.textContent = year; // Update the year element
}

updateDateAndYear();
setInterval(updateDateAndYear, 1000 * 60 * 60 * 24); // every day