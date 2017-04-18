<?php
/**
* Funções variadas do Sistema
* @author Rafael
*/

class Funcoes{ 

  public function __construct(){
    #code
  }

  public function varHtml($string){
    if(empty($string)){
      return '';
    }else{
      return addslashes(htmlentities(mb_strtoupper($string)));
    }
  }

  /**
  * Verificar qual tipo de navegador que o usuário está usando
  * @param $useragent qual tipo de navegador
  * @return string nome do navegador
  */
  public function getNavegador($useragent){
    
    if (preg_match('|MSIE ([0-9].[0-9]{1,2})|',$useragent,$matched)) {
        $browser_version=$matched[1];
        $browser = 'IE';
    } elseif (preg_match( '|Opera/([0-9].[0-9]{1,2})|',$useragent,$matched)) {
        $browser_version=$matched[1];
        $browser = 'Opera';
    } elseif(preg_match('|Firefox/([0-9\.]+)|',$useragent,$matched)) {
        $browser_version=$matched[1];
        $browser = 'Firefox';
    } elseif(preg_match('|Chrome/([0-9\.]+)|',$useragent,$matched)) {
        $browser_version=$matched[1];
        $browser = 'Chrome';
    } elseif(preg_match('|Safari/([0-9\.]+)|',$useragent,$matched)) {
        $browser_version=$matched[1];
        $browser = 'Safari';
    } else {
        // browser not recognized!
        $browser_version = 0;
        $browser= 'other';
    }
    
    return $browser;
  }
  
  public function dataParaMysql($data){
    if($data !== '' && $data !== null){
      $arr = explode("/",$data);
      return $arr[2]."-".$arr[1]."-".$arr[0];
    }else{
      return '';
    }
  }

  public function soNumero($str) {
    if($str !== '')
      return preg_replace("/[^0-9]/", "", $str);
    else
      return '';
  }
  
  //Converter a Data do DatePicker JS para o formato MYSQL
  public function dataParaHtml($data){
    if($data !== '' && $data !== null){
      $arr = explode("-",$data);
      return $arr[2]."/".$arr[1]."/".$arr[0];
    }else{
      return '';
    }
  }

  public function paginacao($query, $funcaoJs, $quantidade = 10, $pagina = 1){
    $DB = new DataBase();
    
    //Calcula a pagina de qual valor será exibido
    $inicio     = ($quantidade * $pagina) - $quantidade;
    
    $result = $DB->query($query);
    $obj = $result->fetch_object();
    $totalPagina = ceil( intval($obj->total) / $quantidade);

    $div = '';
    $div .= '<ul class="pagination">';

    if($totalPagina > 1) {
        $div .= '<li><a href="javascript:'.$funcaoJs.'(1);"><i class="fa fa-caret-left"></i></a></li>';
        $tt = 8;
        $in = $pagina - $tt;
                
        if($pagina > $tt){
          for($ia = $in; $ia < $pagina; $ia++){
            $div .= '<li><a href="javascript:'.$funcaoJs.'('.$ia.');">'.$ia.'</a></li>';
          }
        }else{
            for($ia = 1; $ia < $pagina; $ia++){
              $div .= '<li><a href="javascript:'.$funcaoJs.'('.$ia.');">'.$ia.'</a></li>';
            }
        }
        
        $div .= '<li class="active"><a href="javascript:;">'.$pagina.'</a></li>';           

        if($pagina+$tt >= $totalPagina){
          for($ib = $pagina+1; $ib <= $totalPagina; $ib++){            
            $div .= '<li><a href="javascript:'.$funcaoJs.'('.$ib.');">'.$ib.'</a></li>';
          }
        }else{
          for($ib = $pagina+1; $ib <= $pagina+$tt; $ib++){
            $div .= '<li><a href="javascript:'.$funcaoJs.'('.$ib.');">'.$ib.'</a></li>';
          }       
        }               
        $div .= '<li><a href="javascript:'.$funcaoJs.'('.$totalPagina.');"><i class="fa fa-caret-right"></i></a></li>';
    }
    
    $div .= '</ul>';

    return $div;
  }

  /**
  * Gerar menus em <select> dinamicamente
  * @param $banco = mysql ou oracle
  * @param $table = tabela que será selecionado
  * @param $value = valor que será alimentado no campo value
  * @param $descricao = descricao que será mostrado
  * @param $selected = option já selecionado
  * @param $where = condição na busca
  * @return dados json
  */
  public function _dropDown($table,$value,$descricao,$selected = '',$where = '', $orderBy = '', $ordemDesc = '',$todosDados ='N'){
    
    $DB = new DataBase();

    $query = "select {$value} as valor, {$descricao} as descricao from {$table} ";
    $query .= !empty($where) ? " {$where} " : '';
    $query .= $orderBy != '' ? " order by ".$orderBy : " order by descricao";

    //$op = ''; //obsoleto
    $arr = array();

    $i = 1;  

    //conexao mysql
    $result = $DB->query($query);

    if($result->num_rows > 0){
      if($todosDados == 'S'){
        $arr['dados'][0]['valor'] = '';
        $arr['dados'][0]['descricao'] = '---';
      }

      while($obj = $result->fetch_object()){
        $arr['dados'][$i]['valor'] = $obj->valor;
        $arr['dados'][$i]['descricao'] = $obj->descricao;
        $i++;
      }
    }else{
      $arr['dados'][0]['valor'] = 'N';
      $arr['dados'][0]['descricao'] = 'Nenhum dados';
    }    
    
    $arr['total'] = $i;
    return $arr;
  }

  /**
  * @param email = que sera validado
  * @return boolean
  */
  public function validarEmail($email){
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      return false;
    }

    list($user, $host) = explode("@", $email);
    //Verifica se o dom�nio esta acess�vel
    if (!checkdnsrr($host, "MX") && !checkdnsrr($host, "A")){
      return false;
    }  

    return true;
  }

  /**
  * Remover acentuação de palavras
  * @param $string texto acentuado
  * @return string texto sem acentuação
  */
  public function _retirarAcentos($string){

    if($string !== ''){
      $acentos = array ('À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A',
            'Æ' => 'A', 'Ç' => 'C', 'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E',
            'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I', 'Ð' => 'D', 'Ñ' => 'N',
            'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O', 'Ø' => 'O',
            'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ý' => 'Y', 'Ŕ' => 'R',
            'Þ' => 's', 'ß' => 'B', 'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a',
            'ä' => 'a', 'å' => 'a', 'æ' => 'a', 'ç' => 'c', 'è' => 'e', 'é' => 'e',
            'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i',
            'ð' => 'o', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o',
            'ö' => 'o', 'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ý' => 'y',
            'þ' => 'b', 'ÿ' => 'y', 'ŕ' => 'r', "'" => "");

      $nova = strtr($string, $acentos);

      return strtoupper($nova);
    }else{
      return '';
    }
    
  }

  public function searchArray($arr, $field, $value){
      
      foreach($arr as $data)
      {
           if(is_array($data))
           {
                foreach($data as $key => $product)
                {                  
                    if ( @$product[$field] === $value )
                      return $key;
                }
           }
           else
           {
                // echo $data, '<br/>';
           }
      }

     // foreach($arr as $key => $product)
     // {
     //    echo $key."<br>";
     //    if ( $product->$field === $value )
     //       return $key;
     // }
     return false;
  }

  public function getDescricao($tabela, $descricao,$condicao, $valor){
     $DB = new DataBase();

     $query  = "select {$descricao} as descricao from {$tabela} where {$condicao} = '{$valor}'";

     $result = $DB->query($query);
     $obj = $result->fetch_object();

     return $obj->descricao;
  }

  //FUNÇÃO PARA MOSTRAR O TEMPO DA ULTIMA POSTAGEM 
  public function time_stamp($session_time){ 
    $time_difference = time() - $session_time ; 
    $seconds = $time_difference ; 
    $minutes = round($time_difference / 60 );
    $hours = round($time_difference / 3600 ); 
    $days = round($time_difference / 86400 ); 
    $weeks = round($time_difference / 604800 ); 
    $months = round($time_difference / 2419200 ); 
    $years = round($time_difference / 29030400 ); 

    if($seconds <= 60)
    {
      return "alguns segundos atrás"; 
    }
    else if($minutes <=60)
      {
        if($minutes==1)
        {
          return "há 1 minuto"; 
        }
        else
        {
        return "há $minutes minutos"; 
        }
    }
    else if($hours <=24)
    {
        if($hours==1)
        {
          return "há 1 hora";
          }
        else
          {
          return "há $hours horas";
          }
      }
      else if($days <=7)
      {
          if($days==1)
          {
            return "há 1 d&iacutea";
          }
          else
          {
         return "há $days d&iacuteas";
          }
    }
    else if($weeks <=4)
    {
        if($weeks==1)
        {
          return "há uma semana";
        }
        else
        {
          return "há $weeks semanas";
        }
    }
    else if($months <=12)
    {
        if($months==1)
        {
          return "há um mes";
        }
        else
        {
          return "há vários meses";
        } 
    }
    else
    {
      if($years==1)
        {
          return "há um a&ntildeo";
        }
        else
        {
        return "há vários anos";
        }
    }
  }   

  /**
  * Remover acentuação de palavras
  * @param $string texto acentuado
  * @return string texto sem acentuação
  */
  public function _retirarAspas($string){
    $acentos = array ("'" => "", '"' => '');

    $nova = strtr($string, $acentos);

    return strtoupper($nova);
  } 

  /**
  * @param dia da semana
  * @return nome por extenso do dia 
  */
  public function _dayWeek($day){
    
    switch ($day) {
      case 1:
        $dia = "Segunda-feira";
        break;
      case 2:
        $dia = "Terça-feira";
        break;
      case 3:
        $dia = "Quarta-feira";
        break;
      case 4:
        $dia = "Quinta-feira";
        break;
      case 5:
        $dia = "Sexta-feira";
        break;
      case 6:
        $dia = "Sabado";
        break;
      case 7:
        $dia = "Domingo";
        break;      
    }

    return $dia;
  }

  /**
  * @param mês
  * @return nome por extenso do mês 
  */
  public function _month($mes){
    
    switch ($mes) {
      case 1:
        $mes = "Janeiro";
        break;
      case 2:
        $mes = "Fevereiro";
        break;
      case 3:
        $mes = "Março";
        break;
      case 4:
        $mes = "Abril";
        break;
      case 5:
        $mes = "Maio";
        break;
      case 6:
        $mes = "Junho";
        break;
      case 7:
        $mes = "Julho";
        break;
      case 8:
        $mes = "Agosto";
        break;  
      case 9:
        $mes = "Setembro";
        break;
      case 10:
        $mes = "Outubro";
        break;
      case 11:
        $mes = "Novembro";
        break;
      case 7:
        $mes = "Dezembro";
        break;    
    }

    return $mes;
  }

  public function formatValor($value){
    if(is_numeric($value)){
      return $this->formataReal($value);
    }else{
      return $value;
    }
  }

  /** 
    * Função para formatar numeros Floats em Reais
    */ 
  public function formataReal($numero){
    
    $numero = str_replace(",", ".", $numero);

      if(strpos($numero,'.')!='')
      {
           $var=explode('.',$numero);
           if(strlen($var[0])==4)
           {
           $parte1=substr($var[0],0,1);
           $parte2=substr($var[0],1,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1].'0';
           }else
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1];
           }
           }
           elseif(strlen($var[0])==5)
           {
           $parte1=substr($var[0],0,2);
           $parte2=substr($var[0],2,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1].'0';
           }
           else
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1];
           }
           }
           elseif(strlen($var[0])==6)
           {
           $parte1=substr($var[0],0,3);
           $parte2=substr($var[0],3,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1].'0';
           }
           else
           {
            $formatado=$parte1.'.'.$parte2.','.$var[1];
           }
           }
           elseif(strlen($var[0])==7)
           {
           $parte1=substr($var[0],0,1);
           $parte2=substr($var[0],1,3);
           $parte3=substr($var[0],4,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1].'0';
           }
           else
           {
           $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1];
           }
           }
           elseif(strlen($var[0])==8)
           {
           $parte1=substr($var[0],0,2);
           $parte2=substr($var[0],2,3);
           $parte3=substr($var[0],5,3);
           if(strlen($var[1])<2){
           $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1].'0';
           }else{
           $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1];
           }
           }
           elseif(strlen($var[0])==9)
           {
           $parte1=substr($var[0],0,3);
           $parte2=substr($var[0],3,3);
           $parte3=substr($var[0],6,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1].'0';
           }
           else
           {
            $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.$var[1];
           }
           }
           elseif(strlen($var[0])==10)
           {
           $parte1=substr($var[0],0,1);
           $parte2=substr($var[0],1,3);
           $parte3=substr($var[0],4,3);
           $parte4=substr($var[0],7,3);
           if(strlen($var[1])<2)
           {
            $formatado=$parte1.'.'.$parte2.'.'.$parte3.'.'.$parte4.','.$var[1].'0';
           }
           else
           {
            $formatado=$parte1.'.'.$parte2.'.'.$parte3.'.'.$parte4.','.$var[1];
           }
           }
           else
           {
           if(strlen($var[1])<2)
           {
             $formatado=$var[0].','.$var[1].'0';
           }
           else
           {
             $formatado=$var[0].','.$var[1];
           }
           }
        }
        else
        {
         $var=$numero;
         if(strlen($var)==4)
         {
         $parte1=substr($var,0,1);
         $parte2=substr($var,1,3);
         $formatado=$parte1.'.'.$parte2.','.'00';
         }
         elseif(strlen($var)==5)
         {
         $parte1=substr($var,0,2);
         $parte2=substr($var,2,3);
         $formatado=$parte1.'.'.$parte2.','.'00';
         }
         elseif(strlen($var)==6)
         {
         $parte1=substr($var,0,3);
         $parte2=substr($var,3,3);
         $formatado=$parte1.'.'.$parte2.','.'00';
         }
         elseif(strlen($var)==7)
         {
         $parte1=substr($var,0,1);
         $parte2=substr($var,1,3);
         $parte3=substr($var,4,3);
         $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.'00';
         }
         elseif(strlen($var)==8)
         {
         $parte1=substr($var,0,2);
         $parte2=substr($var,2,3);
         $parte3=substr($var,5,3);
         $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.'00';
         }
         elseif(strlen($var)==9)
         {
         $parte1=substr($var,0,3);
         $parte2=substr($var,3,3);
         $parte3=substr($var,6,3);
         $formatado=$parte1.'.'.$parte2.'.'.$parte3.','.'00';
         }
         elseif(strlen($var)==10)
         {
         $parte1=substr($var,0,1);
         $parte2=substr($var,1,3);
         $parte3=substr($var,4,3);
         $parte4=substr($var,7,3);
         $formatado=$parte1.'.'.$parte2.'.'.$parte3.'.'.$parte4.','.'00';
         }
         else
         {
         $formatado=$var.','.'00';
         }
      }
        return $formatado." ";
  }
    
  /** funcao para adicionar mascara em qualquer coisa. 
   * Exemplo de uso:
   * $data = "10102010"; //variavel
   * 
   *  echo mask($data,'##/##/####'); //exemplo de saidas
   *  echo mask($data,'[##][##][####]');
   *  echo mask($data,'(##)(##)(####)');
  */
  public function mascara($val, $mask){
    if($val !== '' && $val !== null){
      $maskared = '';
      $k = 0;
      for($i = 0; $i<=strlen($mask)-1; $i++)
      {
        if($mask[$i] == '#')
        {
          if(isset($val[$k]))
            $maskared .= $val[$k++];
        }
        else
        {
          if(isset($mask[$i]))
            $maskared .= $mask[$i];
        }
      }
      return $maskared;
    }else{
      return '';
    }
  }
}
?>