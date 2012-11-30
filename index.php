<?php
// Check if the user is logged in
$user = null;
if (!empty($_COOKIE["auth"])) {
    $user = $_COOKIE["auth"];
}
?>
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title>My Favorite Beer - Mozilla Persona Test Code</title>
  <link rel="stylesheet" href="css/persona/persona-buttons.css">
 </head>
 <body>
  <h1>My Favorite Beer: a test page for Mozilla Persona</h1>
<?php
if (!empty($user)) {
?>
  <p>Hello <strong><?=$user?></strong>!</p>
  <a href="#" class="persona-button persona-signout"><span>Sign out</span></a>
<?php
}
else {
?>
  <a href="#" class="persona-button persona-signin"><span>Sign in with Persona</span></a>
<?php
}
?>
  <!--jQuery Library from Google-->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

  <!--Persona Library from Mozilla-->
  <script src="https://login.persona.org/include.js"></script>

  <!-- Our custom code -->
  <script src="js/mfb.js"></script>
 </body>
</html>