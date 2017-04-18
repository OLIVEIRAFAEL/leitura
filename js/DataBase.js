/**
* @author - Roni 
*/
"use strict";

var DataBase = {

    db : null,    

    //construct
    init: function(){
        var self = this;

        self.instance(function(inst){
            if(inst == true){
                self.criarBase(); 
            }
        });
    
    },

    instance: function(cb){
        var self = this;

        try{          
            self.db = window.openDatabase("Cometa20.db", "1.0", "Database", 655367);
            console.log("Iniciando");  
            cb(true);       
        }catch(e){          
            Funcoes.alerta(e,'Erro');
            cb(false);
        }
    },

    criarBase: function(){
         var self = this;        

         self.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='cdc_clientes'", [], 
                    function(tx, results) {
                        if (results.rows.length == 1) {
                            //nao faz nada
                        }else{             
                          myApp.showPreloader('Configurando o aplicativo');
                          self.criarTabelas(function(json){                            
                            self.query(json, function(){
                                myApp.hidePreloader();
                                self.inserirDados();                        
                            });                            
                          });
                        }
                    }, self.txErrorHandler);
            }
        );
    },

    inserirDados: function(){
        var self = this;
        var tabelaPopular = ["UF","CIDADES", "NACIONALIDADE", "ESTADO_CIVIL", "CLIENTES_PROFISSAO"];

        tabelaPopular.map(function(tabela) {
            myApp.showPreloader('Carregando dados importantes '+tabela+', aguarde...');
            self.popularTabela(tabela, function(json){                
                self.query(json, function(){                      
                    myApp.hidePreloader();
                    myApp.hidePreloader();
                });
            });
        });        
    },

    /**
    * cb = callback
    */
    criarTabelas: function(cb){        
        $$.ajax({
            url: appUrl+ "ServiceBase.php",
            method: "POST",
            data: {
              acao: 'CriarTabelas'
            },
            dataType:"json",
            success:function (json) {                
                if(json.result == true){
                  cb(json.dados);                  
                }else{
                  var dados = [];
                  cb(dados);
                }                
            },
            error: function(model, response) {
                console.log(JSON.stringify(response));
                console.log(JSON.stringify(model));
                myApp.hidePreloader();
            }
        });
    },

    /**
    * tabela = tabela para popular
    * cb = callback
    */
    popularTabela: function(tabela,cb){        
        $$.ajax({
            url: appUrl+ "ServiceBase.php",
            method: "POST",
            data: {
              acao: 'PopularTabelas',
              tabela: tabela
            },
            dataType:"json",
            success:function (json) {                
                if(json.result == true){
                  cb(json.dados);                  
                }else{
                  var dados = [];
                  cb(dados);
                }                
            },
            error: function(model, response) {
                console.log(JSON.stringify(response));
                console.log(JSON.stringify(model));
                myApp.hidePreloader();
            }
        });
    },

    carregarVeiculo: function(schema, cod_empresa,cb){        
        $$.ajax({
            url: appUrl+ "ServiceBase.php",
            method: "POST",
            data: {
              acao: 'PopularModelos',
              schema: schema,
              cod_empresa: cod_empresa
            },
            dataType:"json",
            success:function (json) {                
                if(json.result == true){
                  cb(json.dados);                  
                }else{
                  var dados = [];
                  cb(dados);
                }                
            },
            error: function(model, response) {
                console.log(JSON.stringify(response));
                console.log(JSON.stringify(model));
                myApp.hidePreloader();
            }
        });
    },

    /**
    * Executar query em SQLite
    * @param dados = query para executa
    * @callback = retorno
    */
    query: function(query, callback) {
        var self = this;
        self.db.transaction(
            function(tx) {                                
                if( $$.isArray(query)){
                    var l = query.length;
                    for (var i = 0; i < l; i++) { 
                        //console.log(query[i]);                                   
                        tx.executeSql(query[i], [], DataBase.txSuccess, DataBase.txErrorHandler);
                    }
                }else{
                    tx.executeSql(query, [], DataBase.txSuccess, DataBase.txErrorHandler);
                }                                
            },
            self.txErrorHandler,
            function(tx) {                
                callback();
            }
        );
    },

    txSuccess: function(tx){
      //
    },

    txErrorHandler: function(tx){
      //Funcoes.alerta(tx.message,'Erro');  
      //console.log(tx);
      myApp.hidePreloader();
    },
}