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

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Get response
        let response = JSON.parse(this.responseText);

        // Print response (validation messages, errors in request)
        if (!response.success) {
          // Get fields from server response, set error labels accordingly
          let field = response.fieldName;

          if (field == "email") {
            emailLabel.textContent = response.message;
          }

          if (field == "username") {
            usernameLabel.textContent = response.message;
          }

          if (field == "password") {
            passwordLabel.textContent = response.message;
          }
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
