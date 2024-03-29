const firebaseConfig = {
  apiKey: "AIzaSyBPkzpXois4qFFg6un9GYAh0KKIVh6g2Xw",
  authDomain: "forestwtsys.firebaseapp.com",
  databaseURL:
    "https://forestwtsys-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "forestwtsys",
  storageBucket: "forestwtsys.appspot.com",
  messagingSenderId: "1084721202155",
  appId: "1:1084721202155:web:2af80d8777ee6f3c0a0fae",
  measurementId: "G-TGTX1Y79FZ",
};

firebase.initializeApp(firebaseConfig);

function login() {
  const email = document.getElementById("mail").value;
  const password = document.getElementById("pass").value;

  // Fetch user data from the Realtime Database
  fetch(`${firebaseConfig.databaseURL}/emails.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data received from server");
      }

      const emails = data;
      const userData = Object.values(emails).find(
        (user) => user.mail === email
      );

      if (!userData) {
        // Email not found in the database
        throw new Error("Email not found in the database");
      }

      // Email exists, now check if the password matches
      if (userData.pass === password) {
        // Password matches, proceed with authentication
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            alert("Login successful! Redirecting to the system...");
            window.location.href = "home.html";
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.error("Login error:", errorMessage);
            alert(errorMessage); // Display error message to the user
          });
      } else {
        // Password doesn't match
        alert("Incorrect email or password. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error.message);
      alert("An error occurred while logging in. Please try again later.");
    });
}
