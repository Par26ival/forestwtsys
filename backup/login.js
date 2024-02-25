document.addEventListener("DOMContentLoaded", function () {
  fetch("./database.json")
    .then((response) => response.json())
    .then((data) => {
      const loginButton = document.querySelector("button");
      loginButton.addEventListener("click", () => {
        const emailInput = document
          .getElementById("mail")
          .value.trim()
          .toLowerCase();
        const passwordInput = document.getElementById("pass").value;

        console.log("Email input:", emailInput);
        console.log("Password input:", passwordInput);

        const towerKeys = Object.keys(data);
        let found = false;

        for (let i = 0; i < towerKeys.length; i++) {
          const tower = data[towerKeys[i]];
          if (tower.mail.toLowerCase() === emailInput) {
            found = true;
            if (tower.pass === passwordInput) {
              console.log("Login successful.");
              alert("Login successful! Redirecting to the system...");
              window.location.href = "home.html";
            } else {
              console.log("Incorrect password.");
              alert("Incorrect password. Please try again.");
            }
            break;
          }
        }

        if (!found) {
          console.log("Email not found.");
          alert("Email not found. Please try again or register.");
        }
      });
    })
    .catch((error) => console.error("Error fetching database:", error));
});
