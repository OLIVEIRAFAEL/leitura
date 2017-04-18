<?php

class AutoLoad
{
    
    protected $ext;
    protected $prefix;
    protected $sufix;

    
    public function __construct($path, $ext){
        $this->setPath($path);
        $this->setExt($ext);
    }

    public function setPath($path)
    {
        set_include_path($path);
    }
    
    /**
     * Define a extensão do arquivo a ser exportado
     *
     * @param string $ext a extensão sem o ponto
     *
     * @return  Não retorna nada
     *
     */
    public function setExt($ext)
    {
        $this->ext='.'.$ext;
    }
    
    /**
     * Define se havera algo a se colocar antes do nome do arquivo
     *
     * @param string $prefix o que vai antes do nome do arquivo
     *
     * @return  Não retorna nada
     *
     */
    public function setPrefix($prefix)
    {
        $this->prefix=$prefix;
    }
    
    /**
     * Define se havera algo a se colocar após o nome do arquivo
     *
     * @param string $sufix o que vai após o nome do arquivo
     *
     * @return  Não retorna nada
     *
     */
    public function setSufix($sufix)
    {
        $this->sufix=$sufix;
    }
    
    /**
     * Transforma a classe em caminho até o arquivo correspondente
     *
     * @param string $className caminho completo até o script
     *
     * @return  $fileName: o caminho até o arquivo da classe
     *
     */
    protected function setFilename($className)
    {   
        $separator = trim(" \ ");
        $className = ltrim($className, $separator);
        $fileName  = '';
        $namespace = '';
        if ($lastNsPos = strrpos($className, $separator)) {
            $namespace = substr($className, 0, $lastNsPos);
            $className = substr($className, $lastNsPos + 1);
            $className = $this->prefix.$className.$this->sufix;
            $fileName  = str_replace($separator, DS, $namespace) . DS;
        }
        $fileName .= str_replace('_', DS, $className) . $this->ext;
        return $fileName;
    }

    /**
     * Carrega arquivos da library
     *
     * @param string $className a classe a se carregar
     *
     * @return  Não retorna nada
     *
     */
    public function loadCore($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'lib'.DS.$fileName;
        
        if (is_readable($fileName)) {
            include $fileName;
        }
    }

    public function loadCorePDF($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'lib'.DS.'mpdf'.DS.$fileName;
        
        if (is_readable($fileName)) {
            include $fileName;
        }
    }

    public function loadJasper($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'lib'.DS.'jasper'.DS.$fileName;
        
        if (is_readable($fileName)) {
            include $fileName;
        }
    }
    
    /**
     * Carrega arquivos da aplicação
     *
     * @param string $className a classe a se carregar
     *
     * @return  Não retorna nada
     *
     */
    public function loadModel($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadCadastros($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'cadastros'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadSite($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'site'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadPublicidade($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'publicidade'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadFinanceiro($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'financeiro'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadWhatsApp($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'lib'.DS.'whatsapp'.DS.$fileName;
        
        if (is_readable($fileName)) {
            include $fileName;
        }
    }

    public function loadOfertas($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'ofertas'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }

    public function loadEmpresas($className)
    {
        $fileName=$this->setFilename($className);
        $fileName= get_include_path().DS.'com'.DS.'php'.DS.'modules'.DS.'empresas'.DS.'model'.DS.$fileName;
        //echo $fileName;
        if (is_readable($fileName)) {
            include_once $fileName;
        }
        
    }
    
}