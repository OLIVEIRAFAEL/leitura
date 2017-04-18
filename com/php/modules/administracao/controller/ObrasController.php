<?php

include_once '../../../model/Config.php';
include_once '../../../model/AutoLoad.php';
include_once '../../../model/Sessao.php';

$Config = new Config();
$autoLoad = new AutoLoad(ROOT,'php');
//autoload
spl_autoload_register(array($autoLoad, 'loadCore'));
spl_autoload_register(array($autoLoad, 'loadModel'));

$DB = new DataBase();

$requerimento = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;

switch ($requerimento['acao']) {
  case 'Buscar':

        $query = "SELECT cod_obra, nome, data, local, ativo FROM obras";
        $i = 0;
        $op = '';
        $result = $DB->query($query);
        while($obj = $result->fetch_object()){
          $i++;
          $op .= '[';                        
          $op .= '"'.$obj->cod_obra.'",';          
          $op .= '"'.$obj->nome.'",';
          $op .= '"'.$obj->data.'",';  
          $op .= '"'.$obj->local.'",';   
          $op .= '"'.$obj->ativo.'"';
          $op .= '],';
        }

        $op = substr($op,0,-1);

        echo '{
              "recordsTotal": '.$i.',
              "recordsFiltered": '.$i.',
              "data": [ '.$op.' ]
              }';
  break;

  case 'SalvarDados':
    $arr = array();
      $nome_obra     = addslashes($_POST['nome_obra']);
      $data_obra     = addslashes($_POST['data_obra']);
      $local_obra     = addslashes($_POST['local_obra']);
      $query = "INSERT INTO `obras`(`nome`, `data`, `local`, `ativo`) 
                VALUES ('".$nome_obra."','".$data_obra."','".$local_obra."','S')";
      $DB->query($query);

      if($DB->getErr() !== ''){
        $arr['result'] = false;
        $arr['msg'] = $DB->getErr();
      }else{
        $arr['result'] = true;
        $arr['msg'] = 'Salvo Com sucesso';
      }
    echo json_encode($arr);
    break;
}
?>
