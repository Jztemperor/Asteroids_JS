// Fire event on registartion form submit
document
  .getElementById("register")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let xhttp = new XMLHttpRequest();

    // Get label selectors
    let usernameLabel = document.getElementById("register_username_label");
    let emailLabel = document.getElementById("register_email_label");
    let passwordLabel = document.getElementById("register_password_label");

    // Clear labels
    usernameLabel.textContent = "";
    emailLabel.textContent = "";
    passwordLabel.textContent = "";

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Get response
        let response = JSON.parse(this.responseText);

        // Print response (validation messages, errors in request)
        if (!response.success) {
          // Read each error from response and assign them to the labels
          response.errors.forEach((error) => {
            let field = error.fieldName;

            if (field == "email") {
              emailLabel.textContent = error.message;
            }

            if (field == "username") {
              usernameLabel.textContent = error.message;
            }

            if (field == "password") {
              passwordLabel.textContent = error.message;
            }
          });
        } else {
          // If registartion was a success, redirect to menu
          window.location.href = "http://localhost/asteroids/index.html";
        }
      }
    };
    xhttp.open("POST", "register.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Extract form data
    let username = document.getElementById("register_username").value;
    let email = document.getElementById("register_email").value;
    let password = document.getElementById("register_password").value;

    // Set request parameters, send request
    let params =
      "register_username=" +
      username +
      "&register_email=" +
      email +
      "&register_password=" +
      password;
    xhttp.send(params);
  });
