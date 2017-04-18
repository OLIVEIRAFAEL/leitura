<?php
 
class Sessao {
    
    private static $instancia = array();
 
    /**
     * 
     * @return Session
     */
    public static function getInstance() {
 
        if (self::$instancia =! null) {
            self::$instancia = new Sessao();
        }
 
        return self::$instancia;
    }

    public static function set($chave, $valor) {
        @session_start();
        $_SESSION[$chave] = $valor;
        session_write_close();
    }
 
    public static function get($chave) {
        @session_start();
        $value = $_SESSION[$chave];
        session_write_close();
        return $value;
    }
 
    public static function checar($chave) {
        @session_start();
        if (isset($_SESSION[$chave]) && (!empty($_SESSION[$chave]))) {
            session_write_close();
            return true;
        }
        else {
            session_write_close();
            return false;
        }
    }

    public static function destroy(){
        @session_start(); 
        session_regenerate_id(true); 
        session_destroy();
        session_write_close();
    }
}