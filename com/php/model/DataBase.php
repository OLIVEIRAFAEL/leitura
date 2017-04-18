<?php
class DataBase {
 
    private $sql; //Query
    private $err; //Error's
    private $aft; //After error
    private $bef; //Before error
    private $lastInsert; //ultimo valor inserido
    private $Mysqli;
    public $MysqlServer;
    public $MysqlUser;
    public $MysqlPass;
    public $MysqlBD;
    
    //Constructor
    //*/
    public function __construct($user = 'root', $pass = '', $bd = 'ler',$server = 'localhost')
    /*/
    public function __construct($user = 'ler', $pass = '<add pass>', $bd = 'ler',$server = 'localhost')
    //*/
    {
        $this->sql = array();
        $this->err = '';
        $this->aft = "<strong>Error:</strong> ";
        $this->bef = "<br />";
        $this->lastInsert = NULL;
        
        $this->MysqlServer = $server;
        $this->MysqlUser = $user;
        $this->MysqlPass = $pass;
        $this->MysqlBD = $bd;
    }
    
    /*
    * Abre conexao Mysql
    */
    public function mConnect(){
        $db = new mysqli($this->MysqlServer, $this->MysqlUser, $this->MysqlPass, $this->MysqlBD);

        if(!$db){
            return false;
        }else{
            $this->Mysqli = $db;
        }
    }

    /*
    * fecha conexao Mysql
    */
    public function mClose(){
        $this->Mysqli->close();
    }
    
        
    public function query($query){
       $this->mConnect();
       
       $result = $this->Mysqli->query($query);

       $this->setLastInsert($this->Mysqli->insert_id);

       $this->err = !$result ? $this->Mysqli->error : '';

       $this->mClose();

       return $result;
    }

    public function queryCache($consulta, $tempo = 3600){
      $this->mConnect();

      $chave = md5($consulta);
      $mem = new Memcache;
      $mem->addServer($_SERVER['HTTP_HOST']);

      $query = $mem->get($chave);

      if ($query === false) {
        $query = $this->Mysqli->query($consulta);
        $mem->set($chave, $query, 0, $tempo);
      }
      
      return $query;      
    }

    public function queryCommit($query){
       $this->mConnect();
       
       $this->Mysqli->autocommit(false);

       $result = $this->Mysqli->query($query);

       $er = true;       

       if(!$result){
          $er = false;

          $this->err = $this->Mysqli->error;
        }else{
          $this->setLastInsert($this->Mysqli->insert_id);
        }

        $er ? $this->Mysqli->commit() : $this->Mysqli->rollback();

        $this->mClose();

        return $er;
    }
    
    
    public function allQuery(){
        $er = false; //Erro

        $this->mConnect();

        //if (@mysqli_connect_errno()) return false;

        $this->Mysqli->autocommit(false);

        foreach ($this->sql AS $ss){
          if ($ss){
            if (!$this->Mysqli->query($ss)){
              $er = true;
              $this->err.= $this->aft.$this->Mysqli->error.$this->bef;
            }
          }
        }

        $er ? $this->Mysqli->rollback() : $this->Mysqli->commit();
            

        $this->mClose();

        return !$er;
  }
  
  //Retorna os atributos
  function getSQL(){ return $this->sql; }
  function getErr(){ return $this->err; }
  function getLastInsert(){ return $this->lastInsert; }
  
   //config das funcoes
  function setSQL($value){ $this->sql[] = $value; }
  function setAft($value){ $this->aft   = $value; }
  function setBef($value){ $this->bef   = $value; }
  function setLastInsert($value){ $this->lastInsert = $value; }
}