<?php

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
$DB = new DataBase();

//ações requisitadas
$request = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;

//ações
switch ($request['acao']) {

  case 'MenuUsuario':
    
    $menu = array();
    $pagina = $_POST['pagina'];

    $sql = "select * FROM sistema_menu WHERE EXIBIR = 'S' order by COD_MENU";
 
    $result = $DB->query($sql);
     
    $i = 1;
    while ( $row = $result->fetch_object() )
    {
      $menu[$i]['cod_menu'] = $row->cod_menu;
      $menu[$i]['cod_pai'] = $row->cod_pai;
      $menu[$i]['link'] = $row->link;
      $menu[$i]['descricao'] = $row->descricao;
      $menu[$i]['icone'] = $row->icone;
      $menu[$i]['cor_btn'] = $row->cor_btn;
      $menu[$i]['acesso_geral'] = $row->acesso_geral;
      //verificar se o menu possui sub-menu
      $query = "select count(*) as total FROM sistema_menu where cod_pai = ".$row->cod_menu." and exibir = 'S'";
      $res = $DB->query($query);
      $obj = $res->fetch_object();
      $menu[$i]['controle'] = $obj->total;
      $i++;
    }  
    Menu::loadMenu(0,$menu,$Sessao->get("site_acessos"),$Sessao->get("site_cod_grupo_acesso"),'sidebar-menu',$pagina);
  break;

}