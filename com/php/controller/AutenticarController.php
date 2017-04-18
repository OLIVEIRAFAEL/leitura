<?php
/**
* @author 
*/

//include de arquivos
include_once '../model/Config.php';
include_once '../model/AutoLoad.php';
include_once '../model/Sessao.php';

$Config = new Config();
$autoLoad = new AutoLoad(ROOT,'php');
//autoload
spl_autoload_register(array($autoLoad, 'loadCore'));
spl_autoload_register(array($autoLoad, 'loadModel'));

$Sessao = Sessao::getInstance();

//ações requisitadas
$request = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;

//ações
switch ($request['acao']) {

  case 'LoginWeb':
    
    //Recebendo os dados do formulario
    $login = !empty($_POST["login"]) && isset($_POST['login']) ? addslashes(trim($_POST["login"])) : "";
    $senha = !empty($_POST["senha"]) && isset($_POST['senha']) ? trim(addslashes($_POST["senha"])) : "";

    //tratamento de erros para exibir ao usuario
    $erro = '';
    $erro .= empty($login) ? ' <br>Informe seu usuário<br>' : '';
    $erro .= empty($senha) ? ' Informe sua senha' : '';

    //arrray
    $arr = array();

    //se nao possuir nenhum erro entra no bloco
    if(empty($erro)){

      $result = Autenticar::LoginWeb($login,md5($senha));
      
      //conectou com sucesso?
      if($result === true){
        $arr['result'] = true;
        $arr['msg'] = '';
      }else{
        $arr['result'] = false;
          $arr['msg'] = $result;
      }       
    }else{
      $arr['result'] = false;
        $arr['msg'] = $erro;
    } //fim do bloco de erro

    echo json_encode($arr);
  break; 

}