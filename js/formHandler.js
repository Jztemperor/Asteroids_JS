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
        let response = JSON.parse(this.responseText);

        // Get field from response (which caused the error)
        let field = response.fieldName;

        // Print response (validation messages, errors in request)
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
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
