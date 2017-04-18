<?php  
class Config {

    public $url;
    public $pastaRoot;
    public $titleSite;
    
    //carrega dados do Config
    public function __construct(){         

        //ativar exibição de erros
        $erros = false;
            
        if($erros == true){
            ini_set('display_errors',1);
            ini_set('display_startup_erros',1);
            error_reporting(E_ALL);
        }

        //*/
            $this->url = "http://localhost/leitura/";
            $this->pastaRoot = $_SERVER['DOCUMENT_ROOT'].'/leitura/';
        /*/
            $this->url = "http://pesquisa.unemat.br/leitura/";
            $this->pastaRoot = $_SERVER['DOCUMENT_ROOT'].'/leitura/';
        //*/
        $this->titleSite = "Balestrin";

        @header('Content-Type: text/html; charset=utf-8');
        @header('Access-Control-Allow-Origin: *');

        //variaveis constantes
        @define('DS',DIRECTORY_SEPARATOR); 
        @define('ROOT',$this->pastaRoot);
    }
}
