<?php
  ob_start();
  //INICIALIZA A SESSÃO
  session_start();
  
  //DESTRÓI AS SESSOES
  session_destroy();

  
  //REDIRECIONA PARA A TELA DE LOGIN
  header("Location: login.php");
?>