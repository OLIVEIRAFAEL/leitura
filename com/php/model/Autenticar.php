<?php
/**
* Autenticar
* @author Rafael
*/
class Autenticar {
 
    public static function isLogin(){
      
      $Config = new Config();

       if(Sessao::checar('site_cod_empresa') && Sessao::checar('site_cod_funcionario')){
            return true;
       }else{
            self::logoff();
            //redirecionar
            header("Location: ".$Config->url."login.php");
       }
    }

    public static function isAcesso($acessos){
      //verifica apenas um valor único se possui na lista de acesso
      if(in_array($acessos, Sessao::get('site_acessos')) || Sessao::get('site_cod_grupo_acesso') === '1' || empty($acessos)){
        return true;
      }else{
        return false;
      }
    }

    public static function isAcessoPag($pasta, $pagina){
      $DB = new DataBase();
      //recupera o codigo
      $query = "select cod_menu from sistema_menu where link = '{$pasta}/{$pagina}'";
      $result = $DB->query($query);
      $obj = $result->fetch_object();

      if(self::isAcesso($obj->cod_menu)){
        return true;
      }else{
        return false;
      }
    }
    
    public static function logoff(){
      Sessao::destroy();        
    }

    public static function loginWeb($usuario, $senha){
      $DB = new DataBase(); 
      
      //recuperando os dados do funcionario
     $query = "SELECT a.`cod_colaborador`, c.`cod_empresa`, a.`cod_grupo_acesso`,
                             b.`cod_funcao`, b.`descricao`, a.`Nome`, a.`email`,
                             c.`ativo` as ativo_empresa,
                             a.`ativo`,
                             a.`acessos`
                             FROM `colaborador` as a
              LEFT OUTER JOIN `funcao` as b on b.cod_funcao = a.funcao
              LEFT OUTER JOIN `empresas` as c on c.cod_empresa = b.empresa
              WHERE a.email = '{$usuario}' and a.senha = '{$senha}'";
      $result = $DB->query($query); 
     
      if($result->num_rows > 0){
        
        $obj = $result->fetch_object();
        //verificando se a empresa está ativa no sistema
        if($obj->ativo_empresa === 'S'){
          //verificando conta do usuario ativo
          if($obj->ativo === 'S'){
            //criando as Sessões
            Sessao::set('site_cod_empresa', $obj->cod_empresa);
            Sessao::set('site_cod_funcionario', $obj->cod_colaborador);
            Sessao::set('site_cod_funcao', $obj->cod_funcao);
            Sessao::set('site_funcao', $obj->descricao);
            Sessao::set('site_nome', $obj->Nome);
            Sessao::set('site_email', $obj->email);
            Sessao::set('site_cod_grupo_acesso', $obj->cod_grupo_acesso);

            //verificando se tem acessos
            
            $acessos = $obj->acessos !== '' && $obj->acessos !== null ? explode(",", $obj->acessos) : array();
            Sessao::set('site_acessos', $acessos);

            return true;
          }else{
            return "Seu usuário está inativo, entre em contato com o administrador do sistema";
          }
        }else{
          return "Ops, acesso não autorizado. Entre em contato com o Suporte.";
        }
      }else{
        return "Usuário ou senha estão incorretos";
      }

    }
}