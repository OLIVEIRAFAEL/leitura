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

        $query = "SELECT a.`cod_foto`, b.`nome`, a.`local`, a.`ativo` FROM `fotos_obras` as a
                    left outer join `obras` as b on `cod_obra` = `obras`
                  WHERE 1";
        $i = 0;
        $op = '';
        $result = $DB->query($query);
        while($obj = $result->fetch_object()){
          $i++;
          $op .= '[';                        
          $op .= '"'.$obj->cod_foto.'",';          
          $op .= '"'.$obj->nome.'",';
          $op .= '"'.$obj->local.'",';  
          $op .= '"'.$obj->ativo.'",';   
          $op .= '';
          $op .= '],';
        }

        $op = substr($op,0,-1);

        echo '{
              "recordsTotal": '.$i.',
              "recordsFiltered": '.$i.',
              "data": [ '.$op.' ]
              }';
  break;

  case 'BuscarAlbum':
      $i = 0;
      $op = '';
      $p = '../../../../../images/midias/';
      $a = glob($p.'*');
      $btn='';
      foreach ($a as $key => $value) {
        $valor1 = str_replace("../../../../../","",$value);
        $valor2 = str_replace("../../../../../images/midias/","",$value);
          //$ca = explode('/',$value);
          $paths = glob($p.$valor2.'/*.jpeg');
          if(sizeof($paths)>0){
            $btn='<button onclick=\"FotosObras.viewAlbum(\''.$valor1.'\');\" class=\"btn btn-default btn-sm\"><i class=\"fa fa-photo\"></i></button>';
            $btn2='<button onclick=\"FotosObras.addAlbum(\''.$valor1.'\');\" class=\"btn btn-default btn-sm\"><i class=\"fa fa-check-square-o\"></i></button>';
            $i++;
            $op .= '[';                        
            $op .= '"'.$i.'",';          
            $op .= '"'.$valor2.'",';
            $op .= '"'.sizeof($paths).'",';  
            $op .= '"'.$btn.'",';   
            $op .= '"'.$btn2.'"';
            $op .= '],';
          }
      }

        $op = substr($op,0,-1);

        echo '{
              "recordsTotal": '.$i.',
              "recordsFiltered": '.$i.',
              "data": [ '.$op.' ]
              }';
    break;

  case 'addlbum':
    $arr = array();
      $path     = addslashes($_POST['path']);
      $obra     = addslashes($_POST['ob']);
      $query = "INSERT INTO `fotos_obras`(`obras`, `local`, `ativo`) 
                VALUES (".$obra.",'".$path."','S')";
      $DB->query($query);

      if($DB->getErr() !== ''){
        $arr['result'] = false;
        $arr['msg'] = $DB->getErr();
      }else{
        $arr['result'] = true;
        $arr['msg'] = 'Album Salvo Com Sucesso';
      }
    echo json_encode($arr);
    break;
    
    case 'viewAlbum':
      //first>active
      $path = $requerimento['path'];
      $p = '../../../../../'.$path;
      $paths = glob($p.'/*.jpeg');
      $album = '';
      $row = '';
      $i=0;
      $ac = 'active';
      $acr = 'class="'.$ac.'"';
      foreach ($paths as $key => $val) {
        if($i==1){
          $ac='';
          $acr='';
        }
        $row .= '<li data-target="#carousel-demo" data-slide-to="'.$i.'" '.$acr.'></li>';
        $album .= '<div class="item '.$ac.'">';  
        $album .= '
                    <img class="img-responsive img-rounded" src="'.$Config->url.str_replace("../../../../../","",$val).'" alt="">
                      <div class="carousel-caption">
                        <h3></h3>
                      </div>
                  </div>';
        $i++;
      }
      $arr['fotos'] = $album;
      $arr['row'] = $row;
      echo json_encode($arr);
      break;
}
?>
