<?php
 
class Sessao {
 
    public static function set($chave, $valor) {
        session_start();
        $_SESSION[$chave] = $valor;
        session_write_close();
    }
 
    public static function get($chave) {
        session_start();
        $value = $_SESSION[$chave];
        session_write_close();
        return $value;
    }
 
    public static function existe($chave) {
        session_start();
        if (isset($_SESSION[$chave]) && (!empty($_SESSION[$chave]))) {
            session_write_close();
            return true;
        }
        else {
            session_write_close();
            return false;
        }
    }
}