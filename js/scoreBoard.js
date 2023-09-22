// Fire call on page load
document.addEventListener("DOMContentLoaded", function (event) {
  const table = document.getElementById("scoreboard");

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Get response
      let response = JSON.parse(this.responseText);

      if (response.success) {
        let rank = 1;
        response.payload.forEach((entry) => {
          const tableRow = document.createElement("tr");
          tableRow.innerHTML = `
            <td>${rank}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
          `;

          table.appendChild(tableRow);

          rank++;
        });
      }
    }
  };

  xhttp.open("GET", "scoreboard.php", true);
  xhttp.send();
});
