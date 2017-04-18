<?php

include_once 'com/php/model/Config.php';

$Config = new Config();

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ADM | <?php echo $Config->titleSite; ?></title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="plugins/iCheck/square/blue.css">

<!-- COPY App CSS -->
  <link rel="stylesheet" href="com/js/plugins/select2/select2.css">
  <link rel="stylesheet" href="com/js/libs/css/ui-lightness/jquery-ui-1.9.2.custom.min.css">

  <script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
  <script src="bootstrap/js/bootstrap.min.js"></script>
  <script src="plugins/iCheck/icheck.min.js"></script>

<!--COPY-->
  <script src="com/js/libs/jquery-ui-1.9.2.custom.min.js"></script>
  <script src="com/js/plugins/howl/howl.js"></script>
  <script src="com/js/plugins/select2/select2.js"></script>
  <script src="com/js/libs/jquery.blockUI.js"></script>

  <script src="com/js/login.js"></script>
  <script src="com/js/App.js"></script>
  <script src="com/js/Funcoes.js"></script>
  <script src="com/js/mask.js"></script>
  <script>
    $(function () {
      App.url = '<?php echo $Config->url; ?>';
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
    });
  </script>
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="login.php"><b>ADM</b> | <?php echo $Config->titleSite; ?></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body" id="formLogin">
    <p class="login-box-msg">Bem Vindo!</p>

      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="E-mail" id="usuario">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" id="senha" placeholder="Senha">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Lembre-me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button id="btnLogin" class="btn btn-primary btn-block btn-flat">Entrar</button>
        </div>
        <!-- /.col -->
      </div>
    <a id="btnForgot" href="javascript:;">Esqueceu sua senha?</a><br>
  </div>
  <!-- /.login-box-body -->
  <div class="login-box-body" id="forgotPass" style="display:none">
    <p class="login-box-msg">Resetar sua Senha</p>
    <form class="form account-form">
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="E-mail" id="email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="row">
        <!-- /.col -->
        <div class="col-xs-6">
          <button id="btnResend" type="button" class="btn btn-secondary btn-block btn-flat" onclick="login.forgotPass();">
                Resetar Senha
              </button>
        </div>
        <!-- /.col -->
      </div>
      <a id="btnBackLogin" href="javascript:;"><i class="fa fa-angle-double-left"></i> &nbsp;Voltar para o Login</a>
    </form>
</div>
</div>

<div id="loadingShow" style="display:none;"> 
    <h1>Aguarde...</h1> 
</div> 
</body>
</html>
