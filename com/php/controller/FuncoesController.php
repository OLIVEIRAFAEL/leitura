<?php
/**
* @author Rafael
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
$DB = new DataBase();
$Funcoes = new Funcoes();

//ações requisitadas
$request = $_SERVER['REQUEST_METHOD'] == 'GET' ? $_GET : $_POST;

$codSistemaEmpresa = (int)$Sessao->get("site_cod_empresa");

if($codSistemaEmpresa !== 0 || !empty($codSistemaEmpresa)){
  //ações
  switch ($request['acao']) {

    case 'CarregarSelect':
      
      $tabela   = @addslashes($request['tb']);
      $valor    = @addslashes($request['vl']);
      $descricao  = @($request['ds']);
      $where    = @($request['wh']);
      $orderBy  = @addslashes($request['by']);
      $ordemDesc  = @addslashes($request['ord']);

      $erro = '';
      $erro .= empty($tabela) ? 'Erro tabela' : '';
      $erro .= empty($valor) ? 'Erro valor' : '';
      $erro .= empty($descricao) ? 'Erro descricao' : '';

      $permitido = array('obras');

      if(empty($erro)){
        if(in_array($tabela, $permitido))
          echo json_encode($Funcoes->_dropDown($tabela,$valor,$descricao,"",$where,$orderBy,$ordemDesc,'S'));   
        else
          echo "Não permitido";
      }else{
        echo "Erro para gerar os dados";
      } 

    break;

    case 'CarregarEstados':

      $query = "select cod_estado as valor, descricao from sistema_estados order by descricao";
      $a = 0;

      $arr = array();

      $result = $DB->query($query);
      while($obj = $result->fetch_object()){
        $arr['dados'][$a]['valor'] = $obj->valor;
        $arr['dados'][$a]['descricao'] = ($obj->descricao);
        $a++;
      }

      $arr['total'] = $a;
      
      echo json_encode($arr);
    break;

    case 'CarregarCidades':

      $valor = !empty($request['valor']) ? addslashes($request['valor']) : '';

      $query  = "select cod_cidade as valor, descricao from sistema_cidades where 1=1 ";
      $query .= !empty($valor) ? " and cod_estado = '{$valor}'" : "";
      $query .= " order by descricao";
      $a = 0;

      $arr = array();

      $result = $DB->query($query);
      while($obj = $result->fetch_object()){
        $arr['dados'][$a]['valor'] = $obj->valor;
        $arr['dados'][$a]['descricao'] = ($obj->descricao);
        $a++;
      }

      $arr['total'] = $a;
      
      echo json_encode($arr);
    break;

    case 'CarregarEmpresas':

      $acesso = !empty($request['acesso']) ? intval($request['acesso']) : '';

      $query  = "select cod_cooperativa as valor, nome descricao from cooperativa where 1=1 ";
      //$query .= " and cod_cooperativa = '{$codSistemaEmpresa}'";
      
      $query .= Autenticar::isAcesso($acesso) ? "" : " and cod_cooperativa = '".$Sessao->get('site_cod_empresa')."'";
      $query .= " order by nome";

      $a = 1;

      $arr = array();

      if(Autenticar::isAcesso($acesso)){
        $arr['dados'][0]['valor'] = '';
        $arr['dados'][0]['descricao'] = '-- Todos --';
      }

      $result = $DB->query($query);
      
      while($obj = $result->fetch_object()){
        $arr['dados'][$a]['valor'] = $obj->valor;
        $arr['dados'][$a]['descricao'] = utf8_encode($obj->descricao);
        $a++;
      }

      $arr['total'] = $a;
      
      echo json_encode($arr);
    break;

  }
}else{
  echo json_encode(array("msg" => "Acesso não permitido"));
}