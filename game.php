<?php
  session_start();
  if(!isset($_SESSION['username']))
  {
    header("Location: auth.html");
    exit();
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./css/game.css" />
    <title>Asteroids</title>
  </head>
  <body>
    <canvas id="canvas"></canvas>

    <script src="./js/game.js" type="module"></script>
  </body>
</html>
